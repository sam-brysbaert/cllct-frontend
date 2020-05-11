import { Injectable } from '@angular/core';
import { Category, FlatCategory } from './category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { debounceTime, delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryDataService {
  private Url: string = 'assets/category.json';
  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${environment.apiUrl}/collect/category/list`
    );
  }

  fetchFlatCategories(): Observable<FlatCategory[]> {
    return this.getCategories().pipe(
      map((cats) => {
        return this.flattenCategories(cats);
      })
    );
  }

  // recursive function to convert a nested list of categories to
  // a flat list with level property to show depth
  flattenCategories(
    categories: Category[],
    level: number = 0,
    parentId: number = null
  ): FlatCategory[] {
    let categoriesFlat: FlatCategory[] = [];
    categories.forEach((c) => {
      categoriesFlat.push({
        name: c.name,
        id: c.id,
        color: c.color,
        level,
        parentId,
      });
      if (this.hasChild(c)) {
        categoriesFlat = categoriesFlat.concat(
          this.flattenCategories(c.children, level + 1, c.id)
        );
      }
    });
    console.log(categoriesFlat);
    return categoriesFlat;
  }

  hasChild(cat: Category) {
    return !!cat.children && cat.children.length > 0;
  }
}
