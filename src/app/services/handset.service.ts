import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { shareReplay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HandsetService {
  private _isHandset$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this._isHandset$ = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(
        map((result) => result.matches),
        shareReplay()
      );
  }

  get isHandset$() {
    return this._isHandset$;
  }
}
