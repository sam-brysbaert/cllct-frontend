import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkListComponent } from './link-list/link-list.component';
import { LinkDetailsComponent } from './link-details/link-details.component';
import { MatCardModule } from '@angular/material/card';
import { CategoryListComponent } from './category-list/category-list.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    LinkListComponent,
    LinkDetailsComponent,
    CategoryListComponent,
  ],
  imports: [CommonModule, MatCardModule, MatTreeModule, MatIconModule],
  exports: [LinkListComponent, LinkDetailsComponent, CategoryListComponent],
})
export class LinkModule {}
