import { Injectable, OnInit } from '@angular/core';
import linkJson from '../../temp-data/link.json';
import { Ilink } from './link';

@Injectable({
  providedIn: 'root',
})
export class LinkDataService {
  link: Ilink;

  constructor() {
    this.link = linkJson;
  }

  public getLink(): Ilink {
    return this.link;
  }
}
