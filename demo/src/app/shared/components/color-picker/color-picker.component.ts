import { Component, Output, Input, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { makeStyles } from 'jss-theme';
import { NgStyledComponent } from 'jss-theme-angular';

const styles = makeStyles(() => ({
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
export class ColorPickerComponent extends NgStyledComponent {
  @Input() public control: FormControl;
  @Output() public onInput = new EventEmitter();

  @ViewChild('colorInput', { static: true }) private colorInput: ElementRef<HTMLInputElement>;

  public constructor() { super(styles); }

  public handleClick(): void {
    this.colorInput.nativeElement.click();
  }

  public handleChange(e: UiEvent): void {
    this.control.setValue(e.currentTarget.value);
    this.onInput.emit(e);
  }
}
