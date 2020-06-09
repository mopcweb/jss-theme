import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '@app/pages/home/home.component';

import { DocsModule } from '@app/pages/docs/docs.module';
import { CreateThemeModule } from '@app/pages/create-theme/create-theme.module';
import { NotFoundModule } from '@app/pages/not-found/not-found.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'docs',
    loadChildren: (): Promise<typeof DocsModule> => import('./pages/docs/docs.module').then((m) => m.DocsModule),
  },

  {
    path: 'create-theme',
    loadChildren: (): Promise<typeof CreateThemeModule> => import('./pages/create-theme/create-theme.module')
      .then((m) => m.CreateThemeModule),
  },

  {
    path: '**',
    loadChildren: (): Promise<typeof NotFoundModule> => import('./pages/not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
