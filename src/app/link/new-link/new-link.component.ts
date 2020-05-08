import { Component, Inject, OnInit } from '@angular/core';
import { Link } from '../link';
import { LinkDataService } from '../link-data.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../category/category';
import { Observable } from 'rxjs';
import { CategoryDataService } from '../../category/category-data.service';
@Component({
  selector: 'app-new-link',
  templateUrl: './new-link.component.html',
  styleUrls: ['./new-link.component.scss'],
})
export class NewLinkComponent implements OnInit {
  public linkForm: FormGroup;
  categories$: Observable<Category[]>;
  categoriesFlat;

  constructor(
    public dialogRef: MatDialogRef<NewLinkComponent>,
    @Inject(MAT_DIALOG_DATA) public link: Link,
    private linkDataService: LinkDataService,
    private categoryDataService: CategoryDataService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.linkForm = this.formBuilder.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
    this.categories$ = this.categoryDataService.getCategories();
    this.categories$.subscribe((x) => {
      this.categoriesFlat = this.flattenCategories(x);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createLink() {
    this.linkDataService.createLink('archlinux', 'http://www.archlinux.org');
  }

  flattenCategories(categories: Category[], level: number = 0) {
    let categoriesFlat = [];
    categories.forEach((y) => {
      categoriesFlat.push({ name: y.name, id: y.id, color: y.color, level });
      if (this.hasChild(y)) {
        categoriesFlat = categoriesFlat.concat(
          this.flattenCategories(y.children, level + 1)
        );
      }
    });
    return categoriesFlat;
  }

  hasChild(cat: Category) {
    return !!cat.children && cat.children.length > 0;
  }

  onSubmit() {
    console.log(this.linkForm);
  }
}
