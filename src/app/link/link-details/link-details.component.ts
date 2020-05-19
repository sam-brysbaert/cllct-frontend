import { Component, OnInit, Input } from '@angular/core';
import { Link } from '../link';
import { LinkDataService } from '../link-data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditLinkComponent } from '../edit-link/edit-link.component';

@Component({
  selector: 'app-link-details',
  templateUrl: './link-details.component.html',
  styleUrls: ['./link-details.component.scss'],
})
export class LinkDetailsComponent implements OnInit {
  @Input() link: Link;
  constructor(
    private linkDataService: LinkDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  open(link: Link) {
    let path: string = link.path;
    if (!path.match(/^https?:\/\//i)) {
      path = 'http://' + path;
    }
    window.open(path);
  }

  openEditLinkDialog() {
    this.dialog.open(EditLinkComponent, {
      data: this.link,
    });
  }

  deleteLink() {
    this.linkDataService.deleteLink(this.link);
  }
}
