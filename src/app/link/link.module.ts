import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkListComponent } from './link-list/link-list.component';
import { LinkDetailsComponent } from './link-details/link-details.component';

@NgModule({
  declarations: [LinkListComponent, LinkDetailsComponent],
  imports: [CommonModule],
  exports: [LinkListComponent, LinkDetailsComponent],
})
export class LinkModule {}
