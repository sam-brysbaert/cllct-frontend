import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkListComponent } from './link-list/link-list.component';
import { LinkDetailsComponent } from './link-details/link-details.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [LinkListComponent, LinkDetailsComponent],
  imports: [CommonModule, MatCardModule],
  exports: [LinkListComponent, LinkDetailsComponent],
})
export class LinkModule {}
