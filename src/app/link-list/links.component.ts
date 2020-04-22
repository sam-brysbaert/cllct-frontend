import { Component, OnInit } from '@angular/core';
import { LinkDataService } from '../link-data.service';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css'],
})
export class LinkListComponent implements OnInit {
  public links;
  constructor(private linkDataService: LinkDataService) {}

  ngOnInit(): void {}

  getLinks() {
    this.links = this.linkDataService.getLinks();

    // this.links.forEach((l) => {
    //   console.log(l);
    //   l.website = 'https://' + l.website;
    // });
  }
}
