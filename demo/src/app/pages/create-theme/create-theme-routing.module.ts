import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateThemeComponent } from './create-theme.component';

const routes: Routes = [
  {
    path: '',
    component: CreateThemeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateThemeRoutingModule { }
