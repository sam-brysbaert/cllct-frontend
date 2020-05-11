import { Component, Inject, OnInit } from '@angular/core';
import { Link } from '../link';
import { LinkDataService } from '../link-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlatCategory, Category } from '../../category/category';
import { Observable } from 'rxjs';
import { CategoryDataService } from '../../category/category-data.service';
@Component({
  selector: 'app-new-link',
  templateUrl: './new-link.component.html',
  styleUrls: ['./new-link.component.scss'],
})
export class NewLinkComponent implements OnInit {
  public link: FormGroup;
  categories: FlatCategory[];
  private _currentCategoryId: number;

  constructor(
    public dialogRef: MatDialogRef<NewLinkComponent>,
    private linkDataService: LinkDataService,
    private categoryDataService: CategoryDataService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.link = this.formBuilder.group({
      name: ['', Validators.required],
      path: ['', Validators.required],
      category: ['', Validators.required],
    });

    this._currentCategoryId = this.linkDataService.currentCategoryId;

    this.categoryDataService.fetchFlatCategories().subscribe((cats) => {
      this.categories = cats;
      this.selectCategory(this._currentCategoryId);
    });
  }

  onSubmit() {
    let link: Link = {
      name: this.link.value.name,
      path: this.link.value.path,
      categoryId: this.link.value.category.id,
    };
    this.linkDataService.createLink(link);
    this.dialogRef.close();
  }

  selectCategory(id: number) {
    const toSelect = this.categories.find((c) => c.id === id);
    this.link
      .get('category')
      .setValue(!!toSelect ? toSelect : this.categories[0]);
  }
}
