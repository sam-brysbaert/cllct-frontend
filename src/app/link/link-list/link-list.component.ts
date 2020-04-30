import { Component, OnInit } from '@angular/core';
import { LinkDataService } from '../link-data.service';
import { Link } from '../link';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.scss'],
})
export class LinkListComponent implements OnInit {
  private _fetchLinks$: Observable<Link[]>;
  constructor(private linkDataService: LinkDataService) {}

  ngOnInit(): void {
    this._fetchLinks$ = this.linkDataService.getLinks();
  }

  get links$(): Observable<Link[]> {
    return this._fetchLinks$;
  }
}
