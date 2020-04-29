import { Component, OnInit } from '@angular/core';
import { LinkDataService } from '../link-data.service';
import { Link } from '../link';

@Component({
  selector: 'app-link-details',
  templateUrl: './link-details.component.html',
  styleUrls: ['./link-details.component.css'],
})
export class LinkDetailsComponent implements OnInit {
  link: Link;
  constructor(private linkDataService: LinkDataService) {}

  ngOnInit(): void {
    this.showLink();
  }

  showLink(): void {
    this.linkDataService
      .getLink()
      .subscribe((data: Link) => (this.link = { ...data }));
  }
}
