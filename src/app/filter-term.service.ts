import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// this is a shared service to pass the term from the
// filter box in the header to link-list
@Injectable({
  providedIn: 'root',
})
export class FilterTermService {
  private termSource = new BehaviorSubject('');
  currentTerm = this.termSource.asObservable();

  constructor() {}

  changeTerm(term: string) {
    this.termSource.next(term);
  }
}
