import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Link } from './link';

@Injectable({
  providedIn: 'root',
})
export class LinkDataService {
  constructor(private http: HttpClient) {}

  linksUrl = 'https://localhost:5001/api/collect/category/list';

  public getLinks() {
    let links = this.http.get<Array<Link>>(this.linksUrl).pipe(
      map((x) => {
        return x.map((y) => {
          // console.log(y);
          let newlink = new Link(y['id'], this.fixUrl(y['website']), y['name']);
          return newlink;
        });
      })
    );

    links.subscribe(console.log);

    return links;
  }

  fixUrl(url) {
    return 'http://' + url;
  }
}
