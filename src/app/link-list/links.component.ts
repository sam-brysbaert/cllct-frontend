import { Component, OnInit } from '@angular/core';
import { LinkDataService } from '../link-data.service';
import { Observable } from 'rxjs';
import { Link } from '../link.model';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css'],
})
export class LinkListComponent implements OnInit {
  public _fetchLinks$: Observable<Link[]>;
  constructor(private _linkDataService: LinkDataService) {
    // this._fetchLinks$ = this._linkDataService.links$;
    //temporary
    this.selectLinksFrom(1);
  }

  ngOnInit(): void {}

  public get links$(): Observable<Link[]> {
    return this._fetchLinks$;
  }

  public selectLinksFrom(categoryId) {
    this._fetchLinks$ = this._linkDataService.allLinksFrom$(categoryId);
  }
}
