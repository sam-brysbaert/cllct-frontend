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
@NgModule({
  declarations: [LinkListComponent, LinkDetailsComponent, LinkFilterPipe],
  imports: [
    CommonModule,
    MatCardModule,
    MatTreeModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
  ],
  exports: [LinkListComponent, LinkDetailsComponent],
})
export class LinkModule {}
