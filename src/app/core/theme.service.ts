import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _darkTheme = new Subject<boolean>();
  isDarkTheme = this._darkTheme.asObservable();

  constructor(private cookieService: CookieService) {
    this.setFromCookie();
  }

  setFromCookie() {
    // this needs to happen synchronously, otherwise the cookie will not yet be available to read
    setTimeout(() => {
      this._darkTheme.next(
        this.cookieService.get('darkThemeEnabled') === 'true'
      );
    });
  }

  setDarkTheme(isDarkTheme: boolean): void {
    this._darkTheme.next(isDarkTheme);
    this.cookieService.set('darkThemeEnabled', isDarkTheme ? 'true' : 'false');
  }
}
