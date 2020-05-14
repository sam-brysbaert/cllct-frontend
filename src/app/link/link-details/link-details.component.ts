import { Component, OnInit, Input } from '@angular/core';
import { Link } from '../link';

@Component({
  selector: 'app-link-details',
  templateUrl: './link-details.component.html',
  styleUrls: ['./link-details.component.scss'],
})
export class LinkDetailsComponent implements OnInit {
  @Input() link: Link;
  constructor() {}

  ngOnInit(): void {}

  open(link: Link) {
    let path: string = link.path;
    if (!path.match(/^https?:\/\//i)) {
      path = 'http://' + path;
    }
    window.open(path);
  }
}
