import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlatCategory, Category } from '../../category/category';
import { Observable } from 'rxjs';
import { CategoryDataService } from '../../category/category-data.service';
@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
})
export class NewCategoryComponent implements OnInit {
  public category: FormGroup;
  categories: FlatCategory[];
  categoryColor: string;

  constructor(
    public dialogRef: MatDialogRef<NewCategoryComponent>,
    private categoryDataService: CategoryDataService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.category = this.formBuilder.group({
      name: ['', Validators.required],
      parentCategory: ['', Validators.required],
    });

    this.categoryDataService.fetchFlatCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }

  onSubmit() {
    let category = {
      name: this.category.value.name,
      parentId: this.category.value.parentCategory.id,
    };
    this.categoryDataService.postCategory(category);
    this.dialogRef.close();
  }
}
