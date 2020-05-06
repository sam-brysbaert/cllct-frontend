import { Injectable } from '@angular/core';
import { Category } from './category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { debounceTime, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryDataService {
  private Url: string = 'assets/category.json';
  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${environment.apiUrl}/collect/category/list`,
      {
        headers: new HttpHeaders({
          authorization: `Bearer ${localStorage.getItem('currentUser')}`,
        }),
      }
    );
  }
}
