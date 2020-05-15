import { Injectable } from '@angular/core';
import { Category, FlatCategory } from './category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { debounceTime, delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryDataService {
  private Url: string = 'assets/category.json';
  private _categories$ = new BehaviorSubject<Category[]>([]);

  constructor(private http: HttpClient) {
    this.updateCategories();
  }

  public updateCategories(): void {
    this.http
      .get<Category[]>(`${environment.apiUrl}/collect/category/list`)
      .subscribe((response) => this._categories$.next(response));
  }

  fetchFlatCategories(): Observable<FlatCategory[]> {
    return this.categories$.pipe(
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
    return categoriesFlat;
  }

  hasChild(cat: Category) {
    return !!cat.children && cat.children.length > 0;
  }

  addCategory(category: {
    name: string;
    color: string;
    parentId: number;
  }): void {
    this.http
      .post(`${environment.apiUrl}/category/add`, category)
      .subscribe(() => this.updateCategories());
  }

  editCategory(category: { name: string; parentId: number }): void {
    this.http
      .post(`${environment.apiUrl}/category/edit`, category)
      .subscribe(() => this.updateCategories());
  }

  get categories$(): Observable<Category[]> {
    return this._categories$.asObservable();
  }

  getBy(id: number): Observable<FlatCategory> {
    return this._categories$.pipe(
      map((cats) => this.flattenCategories(cats).find((c) => c.id === id))
    );
  }
}
