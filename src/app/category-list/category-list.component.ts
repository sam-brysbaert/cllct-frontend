import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../category.model';
import { CategoryDataService } from '../category-data.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  private _fetchCategories$: Observable<Category[]>;

  constructor(private _categoryDataService: CategoryDataService) {}

  ngOnInit(): void {
    this._fetchCategories$ = this._categoryDataService.allCategories$();
  }

  get categories$(): Observable<Category[]> {
    return this._fetchCategories$;
  }
}
