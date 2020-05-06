import { Injectable } from '@angular/core';
import { Link } from './link';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry, delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LinkDataService {
  private Url: string = 'assets/link.json';
  private _currentCategoryId: number = null;
  private _links$ = new Subject<Link[]>();

  constructor(private http: HttpClient) {
    this.updateLinks();
  }

  public updateLinks(): void {
    this.http
      .get<Link[]>(
        `${environment.apiUrl}/collect/link/list${
          !!this._currentCategoryId
            ? `?categoryId=${this._currentCategoryId}`
            : ''
        }`
      )
      .subscribe((links) => this._links$.next(links));
  }

  createLink(name: string, path: string): void {
    let link = { name, path, categoryId: 1 };
    this.http
      .post(`${environment.apiUrl}/collect/link`, link)
      .subscribe(() => this.updateLinks());
  }

  set categoryId(id: number) {
    this._currentCategoryId = id;
    this.updateLinks();
  }

  get links$() {
    return this._links$.asObservable();
  }
}
