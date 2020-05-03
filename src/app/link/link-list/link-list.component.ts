import { Component, OnInit } from '@angular/core';
import { LinkDataService } from '../link-data.service';
import { Link } from '../link';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.scss'],
})
export class LinkListComponent implements OnInit {
  private _fetchLinks$: Observable<Link[]>;
  public filterTerm: string;
  public filterLinks$ = new Subject<string>();

  constructor(private linkDataService: LinkDataService) {
    this.filterLinks$
      .pipe(
        distinctUntilChanged(),
        map((val) => val.toLowerCase())
      )
      .subscribe((val) => (this.filterTerm = val));
  }

  ngOnInit(): void {
    this._fetchLinks$ = this.linkDataService.getLinks();
  }

  get links$(): Observable<Link[]> {
    return this._fetchLinks$;
  }
}
