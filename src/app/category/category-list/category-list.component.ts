import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Category } from '../category';
import { CategoryDataService } from '../category-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories$: Observable<Category[]>;
  // tree view
  treeControl = new NestedTreeControl<Category>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<Category>();

  constructor(private categoryDataService: CategoryDataService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryDataService.getCategories();
    this.categories$.subscribe(
      (response) => (this.dataSource = response['categories'])
    );
  }

  hasChild = (_: number, node: Category) =>
    !!node.children && node.children.length > 0;
}
