import { Component, Output, Input, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { themeProvider } from '@app/utils/theme';

const styles = themeProvider.makeStyles(() => ({
  ColorPicker: {
    display: 'block',
    width: '100%',
    height: '100%',
    boxShadow: 'inherit',
    borderRadius: 'inherit',

    '& > input': { visibility: 'hidden' },
  },
}));

@Component({
  selector: 'jss-color-picker',
  templateUrl: './color-picker.component.html',
  styles: [':host { display: block; }'],
})
export class ColorPickerComponent {
  @Input() public control: FormControl;
  @Output() public onInput = new EventEmitter();

  @ViewChild('colorInput', { static: true }) private colorInput: ElementRef<HTMLInputElement>;

  public classes = themeProvider.useStyles(this, styles);

  public handleClick(): void {
    this.colorInput.nativeElement.click();
  }

  public handleChange(e: UiEvent): void {
    this.control.setValue(e.currentTarget.value);
    this.onInput.emit(e);
  }
}
