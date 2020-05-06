import { Component, Inject } from '@angular/core';
import { Link } from '../link';
import { LinkDataService } from '../link-data.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-new-link',
  templateUrl: './new-link.component.html',
  styleUrls: ['./new-link.component.css'],
})
export class NewLinkComponent {
  constructor(
    public dialogRef: MatDialogRef<NewLinkComponent>,
    @Inject(MAT_DIALOG_DATA) public link: Link,
    private linkDataService: LinkDataService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  createLink() {
    this.linkDataService.createLink('archlinux', 'http://www.archlinux.org');
  }
}
