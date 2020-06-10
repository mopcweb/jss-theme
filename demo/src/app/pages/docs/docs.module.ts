import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { DocsRoutingModule } from './docs-routing.module';
import { DocsComponent } from './docs.component';

@NgModule({
  declarations: [
    DocsComponent,
  ],
  imports: [
    SharedModule,
    DocsRoutingModule,
  ],
})
export class DocsModule { }
