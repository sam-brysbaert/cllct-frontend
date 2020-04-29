import { Injectable, OnInit } from '@angular/core';
import linkJson from '../temp-data/link.json';

@Injectable({
  providedIn: 'root',
})
export class LinkDataService implements OnInit {
  link: Ilink;

  constructor() {}

  ngOnInit(): void {
    this.link = linkJson;
    console.log(this.link);
  }

  public getLink(): Ilink {
    return this.link;
  }

  getHello(): string {
    return 'hello';
  }
}
