import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { CreateThemeRoutingModule } from './create-theme-routing.module';
import { CreateThemeComponent } from './create-theme.component';

@NgModule({
  declarations: [
    CreateThemeComponent,
  ],
  imports: [
    SharedModule,
    CreateThemeRoutingModule,
  ],
})
export class CreateThemeModule { }
