import { Component, OnInit } from '@angular/core';
import { LinkDataService } from '../link-data.service';
import { Link } from '../link';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { FilterTermService } from '../../services/filter-term.service';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.scss'],
})
export class LinkListComponent implements OnInit {
  private _fetchLinks$: Observable<Link[]>;
  public filterTerm: string;

  constructor(
    private linkDataService: LinkDataService,
    private filterTermService: FilterTermService
  ) {}

  ngOnInit(): void {
    this._fetchLinks$ = this.linkDataService.links$;
    this.filterTermService.currentTerm.subscribe(
      (term) => (this.filterTerm = term)
    );
  }

  get links$(): Observable<Link[]> {
    return this._fetchLinks$;
  }

  createLink() {
    this.linkDataService.createLink('archlinux', 'http://www.archlinux.org');
  }
}
