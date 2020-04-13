import { Component, OnInit } from '@angular/core';
import { LinkDataService } from './link-data.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css'],
})
export class LinksComponent implements OnInit {
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
