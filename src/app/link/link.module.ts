import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkListComponent } from './link-list/link-list.component';
import { LinkDetailsComponent } from './link-details/link-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LinkFilterPipe } from './link-filter.pipe';

import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { NewLinkComponent } from './new-link/new-link.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    LinkListComponent,
    LinkDetailsComponent,
    LinkFilterPipe,
    NewLinkComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTreeModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
    MatDialogModule,
  ],
  exports: [LinkListComponent, LinkDetailsComponent],
})
export class LinkModule {}
