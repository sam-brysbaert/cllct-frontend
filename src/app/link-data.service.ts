import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Link } from './link.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LinkDataService {
  private _links$ = new BehaviorSubject<Link[]>([]);
  private _links: Link[];
  private linksUrl = 'https://localhost:5001/api/collect/link/list';

  constructor(private http: HttpClient) {
    this.links$.subscribe((links: Link[]) => {
      this._links = links;
      this._links$.next(this._links);
    });
  }

  public allLinksFrom$(categoryId: number) {
    return this._links$;
  }

  get links$() {
    return this.http
      .get(this.linksUrl, {
        headers: new HttpHeaders({
          authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJuYmYiOjE1ODczOTc1MzIsImV4cCI6MTU4ODAwMjMzMiwiaWF0IjoxNTg3Mzk3NTMyfQ.FKVR0FjhrqYzfvn9jts8QlBV5FIqP0SEaMvJOuayMes',
        }),
      })
      .pipe(map((list: any[]): Link[] => list.map(Link.fromJSON)));
  }

  getLinks$(categoryId: number): Observable<Link[]> {
    return this.http
      .get(`${this.linksUrl}\?categoryId=${categoryId}`, {
        headers: new HttpHeaders({
          authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJuYmYiOjE1ODczOTc1MzIsImV4cCI6MTU4ODAwMjMzMiwiaWF0IjoxNTg3Mzk3NTMyfQ.FKVR0FjhrqYzfvn9jts8QlBV5FIqP0SEaMvJOuayMes',
        }),
      })
      .pipe(map((list: any[]): Link[] => list.map(Link.fromJSON)));
  }
}
