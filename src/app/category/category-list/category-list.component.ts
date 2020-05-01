import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Category } from '../category';
import { CategoryDataService } from '../category-data.service';
import { Observable } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  animations: [
    trigger('smoothCollapse', [
      state(
        'show',
        style({
          height: '0',
          overflow: 'hidden',
        })
      ),
      state(
        '*',
        style({
          overflow: 'hidden',
        })
      ),
      transition('* => *', [animate('200ms cubic-bezier(0.25, 0.8, 0.25, 1)')]),
    ]),
  ],
})
export class CategoryListComponent implements OnInit {
  public isCollapsed: boolean = true;
  private _fetchCategories$: Observable<Category[]>;
  // tree view
  treeControl = new NestedTreeControl<Category>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<Category>();

  constructor(private categoryDataService: CategoryDataService) {}

  ngOnInit(): void {
    this._fetchCategories$ = this.categoryDataService.getCategories();
    this._fetchCategories$.subscribe(
      (response) => (this.dataSource.data = response)
    );
  }

  hasChild = (_: number, node: Category) =>
    !!node.children && node.children.length > 0;

  get categories$(): Observable<Category[]> {
    return this._fetchCategories$;
  }
}
