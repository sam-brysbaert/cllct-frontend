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
      .get<Category[]>(`${environment.apiUrl}/category/list`)
      .subscribe((response) => this._categories$.next(response));
  }

  fetchFlatCategories(): Observable<FlatCategory[]> {
    return this.categories$.pipe(map((cats) => this.flattenCategories(cats)));
  }

  fetchEligibleParents(categoryId: number): Observable<FlatCategory[]> {
    return this.fetchFlatCategories().pipe(
      map((cats) => this.removeIneligibleParents(cats, categoryId))
    );
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
      .put(`${environment.apiUrl}/category/edit`, category)
      .subscribe(() => this.updateCategories());
  }

  deleteCategory(id: number) {
    this.http
      .delete(`${environment.apiUrl}/category/delete?id=${id}`)
      .subscribe(() => this.updateCategories());
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

  removeIneligibleParents(cats: FlatCategory[], categoryId): FlatCategory[] {
    for (let i: number = 0; i < cats.length; i++) {
      if (cats[i].id === categoryId) {
        for (let j: number = i + 1; j < cats.length; j++) {
          if (cats[j].level <= cats[i].level) break;
          cats[j] = null;
        }
        break;
      }
    }
    return cats.filter((cat) => !!cat && cat.id !== categoryId);
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
