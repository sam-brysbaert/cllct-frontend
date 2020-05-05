import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Category } from '../category';
import { CategoryDataService } from '../category-data.service';
import { Observable } from 'rxjs';
import { Animations } from '../../animations';
import { HandsetService } from '../../core/handset.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  animations: [Animations.smoothCollapse],
})
export class CategoryListComponent implements OnInit {
  private _fetchCategories$: Observable<Category[]>;
  selectedCategory: Category;
  // tree view
  treeControl = new NestedTreeControl<Category>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<Category>();
  public isCollapsed: boolean = true;
  // for changing layout for devices with narrow screens (i.e. phones)
  isHandset$: Observable<boolean>;

  constructor(
    private categoryDataService: CategoryDataService,
    private handsetService: HandsetService
  ) {}

  ngOnInit(): void {
    this._fetchCategories$ = this.categoryDataService.getCategories();
    this._fetchCategories$.subscribe(
      (response) => (this.dataSource.data = response)
    );
    this.isHandset$ = this.handsetService.isHandset$;
  }

  get categories$(): Observable<Category[]> {
    return this._fetchCategories$;
  }

  onSelect(category: Category) {
    this.selectedCategory = category;
  }

  hasChild = (_: number, node: Category) =>
    !!node.children && node.children.length > 0;
}
