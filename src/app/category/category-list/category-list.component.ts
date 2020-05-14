import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Category } from '../category';
import { CategoryDataService } from '../category-data.service';
import { Observable } from 'rxjs';
import { Animations } from '../../animations';
import { HandsetService } from '../../services/handset.service';
import { LinkDataService } from '../../link/link-data.service';
import { Router } from '@angular/router';

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
    private handsetService: HandsetService,
    private linkDataService: LinkDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._fetchCategories$ = this.categoryDataService.categories$;
    this._fetchCategories$.subscribe(
      (response) => (this.dataSource.data = response)
    );
    this.linkDataService.currentCategory$.subscribe(
      (cat) => (this.selectedCategory = cat)
    );
    this.isHandset$ = this.handsetService.isHandset$;
  }

  get categories$(): Observable<Category[]> {
    return this._fetchCategories$;
  }

  onSelect(category: Category) {
    this.isCollapsed = true;
    if (!category) {
      this.router.navigate([`/category/all`]);
    } else {
      this.router.navigate([`/category/${category.id}`]);
    }
  }

  hasChild = (_: number, node: Category) =>
    !!node.children && node.children.length > 0;
}
