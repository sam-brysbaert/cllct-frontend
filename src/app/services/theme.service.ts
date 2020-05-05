import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _darkTheme = new Subject<boolean>();

  constructor(overlayContainer: OverlayContainer) {
    // this has to be done synchronously, otherwise
    // localstorage will not yet be available to read
    setTimeout(() => {
      this._darkTheme.next(localStorage.getItem('darkThemeEnabled') === 'true');
    });

    // some components (like material menus) are inside of a global
    // overlay container, this makes sure they are styled as well
    this._darkTheme.subscribe((isDark) => {
      if (isDark) {
        overlayContainer.getContainerElement().classList.add('dark-theme');
      } else {
        overlayContainer.getContainerElement().classList.remove('dark-theme');
      }
    });
  }

  setDarkTheme(isDarkTheme: boolean): void {
    localStorage.setItem('darkThemeEnabled', isDarkTheme ? 'true' : 'false');
    this._darkTheme.next(isDarkTheme);
  }

  get isDarkTheme() {
    return this._darkTheme.asObservable();
  }
}
