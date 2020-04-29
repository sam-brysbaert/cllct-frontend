import { Component, OnInit } from '@angular/core';
import { LinkDataService } from '../link-data.service';

@Component({
  selector: 'app-link-details',
  templateUrl: './link-details.component.html',
  styleUrls: ['./link-details.component.css'],
})
export class LinkDetailsComponent implements OnInit {
  constructor(private linkDataService: LinkDataService) {}

  ngOnInit(): void {
    this.printLink();
  }

  printLink(): void {
    console.log(this.linkDataService.getLink());
  }
}
