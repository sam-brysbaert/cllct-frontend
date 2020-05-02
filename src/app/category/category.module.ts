import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CategoryListComponent } from './category-list/category-list.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule, MatDivider } from '@angular/material/divider';

@NgModule({
  declarations: [CategoryListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatTreeModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
    MatDividerModule,
  ],
  exports: [CategoryListComponent],
})
export class CategoryModule {}
