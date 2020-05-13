import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlatCategory, Category } from '../category';
import { CategoryDataService } from '../category-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  public categoryForm: FormGroup;
  categories: FlatCategory[];
  categoryColor: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoryDataService: CategoryDataService,
    public dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public category: FlatCategory
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      parentCategory: [''],
      password: ['', Validators.required],
    });

    this.categoryDataService.fetchFlatCategories().subscribe((cats) => {
      this.categories = cats;
      this.selectParentCategory();
    });
  }
  onSubmit() {
    console.log(this.categoryForm);
  }

  selectParentCategory() {
    const toSelect = this.categories.find(
      (c) => c.id === this.category.parentId
    );
    if (!toSelect) return;
    this.categoryForm.get('parentCategory').setValue(toSelect);
  }
}