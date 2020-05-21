import { Injectable } from '@angular/core';
import { Link } from './link';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, retry, delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Category, FlatCategory } from '../category/category';

@Injectable({
  providedIn: 'root',
})
export class LinkDataService {
  private Url: string = 'assets/link.json';
  private _links$ = new Subject<Link[]>();
  private _currentCategory$ = new BehaviorSubject<FlatCategory>(null);

  constructor(private http: HttpClient) {
    this.updateLinks();
  }

  public updateLinks(): void {
    let cat: Category = this._currentCategory$.getValue();
    this.http
      .get<Link[]>(
        `${environment.apiUrl}/link/list${!!cat ? `?categoryId=${cat.id}` : ''}`
      )
      .subscribe((links) => this._links$.next(links));
  }

  createLink(link): void {
    this.http
      .post(`${environment.apiUrl}/link/add`, link)
      .subscribe(() => this.updateLinks());
  }

  set currentCategory(category: FlatCategory) {
    this._currentCategory$.next(category);
    this.updateLinks();
  }

  public editLink(link: Link): void {
    this.http
      .post(`${environment.apiUrl}/link/edit`, link)
      .subscribe(() => this.updateLinks());
  }

  public deleteLink(link: Link): void {
    this.http
      .post(`${environment.apiUrl}/link/delete`, link)
      .subscribe(() => this.updateLinks());
  }

  get currentCategory$() {
    return this._currentCategory$;
  }

  get links$(): Observable<Link[]> {
    return this._links$.asObservable();
  }
}
