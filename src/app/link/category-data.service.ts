import { Injectable } from '@angular/core';
import { Category } from './category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryDataService {
  private Url: string = 'assets/category.json';
  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.Url);
  }
}
