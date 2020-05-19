import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlatCategory, Category } from '../../category/category';
import { CategoryDataService } from '../../category/category-data.service';
import { Link } from '../link';
import { LinkDataService } from '../link-data.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-link',
  templateUrl: './edit-link.component.html',
  styleUrls: ['./edit-link.component.scss'],
})
export class EditLinkComponent implements OnInit {
  public linkForm: FormGroup;
  categories: FlatCategory[];
  constructor(
    private formBuilder: FormBuilder,
    private categoryDataService: CategoryDataService,
    private linkDataService: LinkDataService,
    public dialogRef: MatDialogRef<EditLinkComponent>,
    @Inject(MAT_DIALOG_DATA) public link: Link
  ) {}

  ngOnInit(): void {
    this.linkForm = this.formBuilder.group({
      category: ['', Validators.required],
      name: [this.link.name, Validators.required],
      path: [this.link.path, Validators.required],
    });

    this.categoryDataService.fetchFlatCategories().subscribe((cats) => {
      this.categories = cats;
      this.selectCategory();
    });
  }

  selectCategory() {
    const toSelect = this.categories.find((c) => c.id === this.link.categoryId);
    if (!toSelect) return;
    this.linkForm.get('category').setValue(toSelect);
  }

  onSubmit() {
    let link: Link = {
      name: this.linkForm.value.name,
      path: this.linkForm.value.path,
      categoryId: this.linkForm.value.category.id,
      linkId: this.link.linkId,
    };
    this.linkDataService.editLink(link);
    this.dialogRef.close();
  }
}
