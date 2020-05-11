import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CategoryDataService } from '../category-data.service';
import { Observable } from 'rxjs';
import { FlatCategory } from '../category';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss'],
})
export class ManageCategoriesComponent implements OnInit {
  public category: FormGroup;
  public errorMessage: string = '';
  categories: FlatCategory[];

  constructor(
    private formBuilder: FormBuilder,
    private categoryDataService: CategoryDataService
  ) {}

  ngOnInit(): void {
    this.category = this.formBuilder.group({
      parentCategory: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.categoryDataService.fetchFlatCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }

  onSubmit() {
    console.log('sumbitted');
  }

  selectParentCategory(cat: FlatCategory) {
    const toSelect = this.categories.find((c) => c.id === cat.parentId);
    if (!toSelect) return;
    this.category.get('parentCategory').setValue(toSelect);
  }
}
