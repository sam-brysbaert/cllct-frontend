import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly _tokenKey = 'currentUser';
  private _user$: BehaviorSubject<string>;
  public redirectUrl: string = null;

  constructor(private http: HttpClient, private router: Router) {
    let parsedToken = this.parseJwt(localStorage.getItem(this._tokenKey));
    if (parsedToken) {
      const expires =
        new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        parsedToken = null;
      }
    }
    this._user$ = new BehaviorSubject(parsedToken && parsedToken.unique_name);
  }

  login(username: string, password: string) {
    username = username.toLowerCase();

    return this.http
      .post(
        `${environment.apiUrl}/user/authenticate`,
        { username, password },
        { responseType: 'text' }
      )
      .pipe(
        map((token: any) => {
          if (token) {
            localStorage.setItem(this._tokenKey, token);
            this._user$.next(username);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  register(username: string, password: string): Observable<boolean> {
    username = username.toLowerCase();

    return this.http
      .post(
        `${environment.apiUrl}/user/register`,
        { username, password },
        { responseType: 'text' }
      )
      .pipe(
        map((token: any) => {
          if (token) {
            localStorage.setItem(this._tokenKey, token);
            this._user$.next(username);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout() {
    if (this.user$.getValue()) {
      localStorage.removeItem('currentUser');
      this._user$.next(null);
    }
    this.router.navigate(['/login']);
  }

  checkUsernameAvailability = (username: string): Observable<boolean> => {
    return this.http.get<boolean>(
      `${environment.apiUrl}/user/username-available`,
      {
        params: { username },
      }
    );
  };

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  parseJwt(token) {
    if (!token) return null;

    const base64Token = token.split('.')[1];
    const base64 = base64Token.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }

  get token(): string {
    const localToken = localStorage.getItem(this._tokenKey);
    return !!localToken ? localToken : '';
  }
}
