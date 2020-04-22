import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from './category.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryDataService {
  private _categories$ = new BehaviorSubject<Category[]>([]);
  private _categories: Category[];
  private linksUrl = 'https://localhost:5001/api/collect/category/list';

  constructor(private http: HttpClient) {
    this.categories$.subscribe((categories: Category[]) => {
      this._categories = categories;
      this._categories$.next(this._categories);
    });
  }

  public allCategories$(): Observable<Category[]> {
    return this._categories$;
  }

  get categories$(): Observable<Category[]> {
    return this.http
      .get(this.linksUrl, {
        headers: new HttpHeaders({
          authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJuYmYiOjE1ODczOTc1MzIsImV4cCI6MTU4ODAwMjMzMiwiaWF0IjoxNTg3Mzk3NTMyfQ.FKVR0FjhrqYzfvn9jts8QlBV5FIqP0SEaMvJOuayMes',
        }),
      })
      .pipe(map((list: any[]): Category[] => list.map(Category.fromJSON)));
  }
}
