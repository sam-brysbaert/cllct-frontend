import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CategoryDataService } from '../category-data.service';
import { Observable } from 'rxjs';
import { FlatCategory } from '../category';
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss'],
})
export class ManageCategoriesComponent implements OnInit {
  public errorMessage: string = '';
  categories: FlatCategory[];

  constructor(
    private formBuilder: FormBuilder,
    private categoryDataService: CategoryDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.categoryDataService.fetchFlatCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }

  openNewCategoryDialog(): void {
    const dialogRef = this.dialog.open(NewCategoryComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openEditCategoryDialog(category: FlatCategory): void {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      data: category,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
