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
import { NewLinkComponent } from './new-link/new-link.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CategoryModule } from '../category/category.module';
import { EditLinkComponent } from './edit-link/edit-link.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    LinkListComponent,
    LinkDetailsComponent,
    LinkFilterPipe,
    NewLinkComponent,
    EditLinkComponent,
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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CategoryModule,
    MatMenuModule,
  ],
  exports: [LinkListComponent, LinkDetailsComponent],
})
export class LinkModule {}
