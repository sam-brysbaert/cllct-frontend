import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Category } from '../category';
import { CategoryDataService } from '../category-data.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories: Category[];
  constructor(private categoryDataService: CategoryDataService) {}

  ngOnInit(): void {
    this.showCategories();
  }

  showCategories(): void {
    this.categoryDataService.getCategories().subscribe((data) => {
      this.categories = data['categories'];
      console.log(this.categories);
    });
  }
}
