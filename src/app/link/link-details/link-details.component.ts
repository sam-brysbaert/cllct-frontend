import { Component, OnInit } from '@angular/core';
import { LinkDataService } from '../link-data.service';
import { Link } from '../link';

@Component({
  selector: 'app-link-details',
  templateUrl: './link-details.component.html',
  styleUrls: ['./link-details.component.css'],
})
export class LinkDetailsComponent implements OnInit {
  links: Link[];
  constructor(private linkDataService: LinkDataService) {}

  ngOnInit(): void {
    this.showLinks();
  }

  showLinks(): void {
    this.linkDataService.getLinks().subscribe((data) => {
      this.links = data['links'];
    });
  }
}
