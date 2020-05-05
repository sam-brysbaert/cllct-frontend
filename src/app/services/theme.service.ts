import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _darkTheme = new Subject<boolean>();
  isDarkTheme = this._darkTheme.asObservable();

  constructor() {
    // this has to be done synchronously, otherwise
    // localstorage will not yet be available to read
    setTimeout(() => {
      this._darkTheme.next(localStorage.getItem('darkThemeEnabled') === 'true');
    });
  }

  setDarkTheme(isDarkTheme: boolean): void {
    localStorage.setItem('darkThemeEnabled', isDarkTheme ? 'true' : 'false');
    this._darkTheme.next(isDarkTheme);
  }
}
