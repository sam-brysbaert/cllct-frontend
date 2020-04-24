import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../category.model';
import { CategoryDataService } from '../category-data.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { LinkListComponent } from '../link-list/links.component';
import { linkSync } from 'fs';

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  id: number;
}

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent {
  private _fetchCategories$: Observable<Category[]>;

  constructor(private _categoryDataService: CategoryDataService) {
    this._fetchCategories$ = this._categoryDataService.allCategories$();
    this._fetchCategories$.subscribe((data) => (this.dataSource.data = data));
  }

  get categories$(): Observable<Category[]> {
    return this._fetchCategories$;
  }

  selectCategory(categoryId: number): void {
    // do stuff when category is selected
    console.log(categoryId);
  }

  private _transformer = (node: Category, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      id: node.categoryId,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode) => node.expandable;
}
