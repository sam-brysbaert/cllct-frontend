import { Component, OnInit } from '@angular/core';
import { LinkDataService } from '../link-data.service';
import { Link } from '../link';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-link-details',
  templateUrl: './link-details.component.html',
  styleUrls: ['./link-details.component.css'],
})
export class LinkDetailsComponent implements OnInit {
  private _fetchLinks$: Observable<Link[]>;
  constructor(private linkDataService: LinkDataService) {}

  ngOnInit(): void {
    this._fetchLinks$ = this.linkDataService.getLinks();
  }

  open(link: Link) {
    window.open(link.path);
  }

  get links$(): Observable<Link[]> {
    return this._fetchLinks$;
  }
}
