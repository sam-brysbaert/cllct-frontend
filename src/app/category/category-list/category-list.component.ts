import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Category } from '../category';
import { CategoryDataService } from '../category-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  private _fetchCategories$: Observable<Category[]>;
  // tree view
  treeControl = new NestedTreeControl<Category>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<Category>();

  constructor(private categoryDataService: CategoryDataService) {}

  ngOnInit(): void {
    this._fetchCategories$ = this.categoryDataService.getCategories();
    this.categories$.subscribe((response) => (this.dataSource.data = response));
  }

  hasChild = (_: number, node: Category) =>
    !!node.children && node.children.length > 0;

  get categories$(): Observable<Category[]> {
    return this._fetchCategories$;
  }
}
