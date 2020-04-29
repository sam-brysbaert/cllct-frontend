import { Injectable } from '@angular/core';
import { Link } from './link';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LinkDataService {
  private Url: string = 'assets/link.json';

  constructor(private http: HttpClient) {}

  public getLink(): Observable<Link> {
    return this.http.get<Link>(this.Url);
  }
}
