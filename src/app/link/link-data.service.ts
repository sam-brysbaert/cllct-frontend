import { Injectable } from '@angular/core';
import { Link } from './link';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LinkDataService {
  private Url = 'assets/link.json';

  constructor(private http: HttpClient) {}

  public getLink() {
    return this.http.get<Link>(this.Url);
  }
}
