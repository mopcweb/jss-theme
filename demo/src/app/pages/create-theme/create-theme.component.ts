import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { createPalette } from 'jss-theme-default';
import { JssTheme, UseStyles, JssClasses } from 'jss-theme';
import { Subscription } from 'rxjs';
import { distinctUntilKeyChanged, debounceTime } from 'rxjs/operators';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { defaultTheme, themeProvider } from '@app/utils/theme';
import { capitalize } from '@app/utils/helpers';
import { Store } from '@app/services';

type TreeNode = {
  key: string;
  value?: GenericObject | string | number | boolean;
  children?: TreeNode[];
}

const styles = themeProvider.makeStyles((theme) => ({
  Title: {
    marginBottom: theme.mixins.spacing(3),
    font: theme.mixins.font('h5'),
    color: theme.palette.primary.main,
  },

  ColorPicker: {
    width: '50px !important',
    minWidth: '50px !important',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
  },

  Tree: {
    padding: theme.mixins.spacing(2, 0),
    background: theme.palette.background.paper,

    '& .mat-tree-node': {
      height: theme.mixins.spacing(3),
      minHeight: theme.mixins.spacing(3),
      whiteSpace: 'nowrap',
      color: theme.palette.text.primary,
    },
  },
  NestedTree: { display: 'none' },
  List: { paddingLeft: theme.mixins.spacing(3), overflowX: 'scroll', overflowY: 'hidden' },
  Key: { marginRight: theme.mixins.spacing(0.5) },
  FunctionValue: { color: theme.palette.warning.main },
  NumberValue: { color: theme.palette.primary.main },
  StringValue: { color: theme.palette.secondary.main },
}));

@Component({
  selector: 'jss-create-theme',
  templateUrl: './create-theme.component.html',
})
export class CreateThemeComponent implements OnDestroy {
  // public classes = themeProvider.useStyles(this, styles);
  @UseStyles(styles)
  public classes: JssClasses;
  public form: FormGroup;
  public sub: Subscription;
  public formSub: Subscription;
  public treeControl = new NestedTreeControl<TreeNode>((node) => node.children);
  public dataSource = new MatTreeNestedDataSource<TreeNode>();

  public constructor(
    public store: Store,
    private formBuilder: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.initForm();
    this.listenThemeChanges();
    this.dataSource.data = this.createTreeLikeStructure(this.store.state.theme.theme);
  }

  public ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
    if (this.formSub) this.formSub.unsubscribe();
  }

  public isNested(_: number, node: TreeNode): boolean {
    return !!node.children && node.children.length > 0;
  }

  public handleApply(): void {
    const theme = {
      ...defaultTheme,
      palette: createPalette({
        primary: { main: this.form.value.primaryColor || '#1976d2' },
        secondary: { main: this.form.value.secondaryColor || '#dc004e' },
        background: {
          default: this.form.value.backgroundDefaultColor || '#fafafa',
          paper: this.form.value.backgroundPaperColor || '#fafafa',
        },
        text: { primary: this.form.value.textColor || 'rgba(0, 0, 0, 0.87)' },
      }),
    };
    this.store.set('theme', { title: 'Custom', theme });
  }

  public defineClass(data: string | number, value?: GenericObject | string | number | boolean): string {
    if (value && typeof value === 'function') return `${this.classes.Key} ${this.classes.FunctionValue}`;
    if (data && typeof data === 'string') return `${this.classes.Key} ${this.classes.StringValue}`;
    if (data && typeof data === 'number') return `${this.classes.Key} ${this.classes.NumberValue}`;
    return this.classes.Key;
  }

  public formatKey({ key, value, children }: TreeNode): string {
    const type = children ? capitalize(typeof children) : '';
    return key && typeof value === 'function' ? `${key}(): ${type}` : `${key}: ${type}`;
  }

  public formatValue({ value }: TreeNode): string {
    if ((!value && value !== 0 && value !== false) || typeof value === 'function') return;
    if (typeof value === 'string') return `"${value}"`;
    return String(value);
  }

  private listenThemeChanges(): void {
    this.sub = this.store.state$
      .pipe(distinctUntilKeyChanged('theme'))
      .pipe(debounceTime(100))
      .subscribe(({ theme }) => {
        this.initForm(theme.theme);
        this.dataSource.data = this.createTreeLikeStructure(this.store.state.theme.theme);
      });
  }

  private createTreeLikeStructure(data: GenericObject): TreeNode[] {
    function createTreeNode(item: GenericObject): TreeNode[] {
      const result: TreeNode[] = [];
      Object.keys(item).forEach((key) => {
        if (key === 'updatedHash') return;
        if (item[key] instanceof Object && !(typeof item[key] === 'function')) {
          result.push({ key, children: createTreeNode(item[key]) });
        } else result.push({ key, value: item[key] });
      });
      return result;
    }

    return createTreeNode(data);
  }

  private initForm(item?: JssTheme): void {
    this.form = this.formBuilder.group({
      primaryColor: new FormControl((item && item.palette && item.palette.primary.main) || ''),
      secondaryColor: new FormControl((item && item.palette && item.palette.secondary.main) || ''),
      backgroundDefaultColor: new FormControl((item && item.palette && item.palette.background && item.palette.background.default) || ''),
      backgroundPaperColor: new FormControl((item && item.palette && item.palette.background && item.palette.background.paper) || ''),
      textColor: new FormControl((item && item.palette && item.palette.text && item.palette.text.primary) || ''),
    });

    // if (this.formSub) this.formSub.unsubscribe();
    // this.formSub = this.form.valueChanges.pipe(debounceTime(50)).subscribe(() => this.handleApply());
  }
}
