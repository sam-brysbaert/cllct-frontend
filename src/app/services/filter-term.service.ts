import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// this is a shared service to pass the search term from the
// filter box in the header to link-list
@Injectable({
  providedIn: 'root',
})
export class FilterTermService {
  private termSource = new BehaviorSubject('');

  constructor() {}

  changeTerm(term: string) {
    this.termSource.next(term);
  }

  get currentTerm() {
    return this.termSource.asObservable();
  }
}
