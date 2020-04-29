import { Component, OnInit } from '@angular/core';
import { LinkDataService } from '../link-data.service';
import { Ilink } from '../link';

@Component({
  selector: 'app-link-details',
  templateUrl: './link-details.component.html',
  styleUrls: ['./link-details.component.css'],
})
export class LinkDetailsComponent implements OnInit {
  link: Ilink;
  constructor(private linkDataService: LinkDataService) {}

  ngOnInit(): void {
    this.link = this.linkDataService.getLink();
  }
}
