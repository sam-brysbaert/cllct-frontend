import { Component, OnInit } from '@angular/core';
import { LinkDataService } from '../link-data.service';
import { Link } from '../link';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { FilterTermService } from '../../services/filter-term.service';
import { MatDialog } from '@angular/material/dialog';
import { NewLinkComponent } from '../new-link/new-link.component';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.scss'],
})
export class LinkListComponent implements OnInit {
  private _fetchLinks$: Observable<Link[]>;
  public filterTerm: string;

  constructor(
    private linkDataService: LinkDataService,
    private filterTermService: FilterTermService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._fetchLinks$ = this.linkDataService.links$;
    this.filterTermService.currentTerm.subscribe(
      (term) => (this.filterTerm = term)
    );
  }

  get links$(): Observable<Link[]> {
    return this._fetchLinks$;
  }

  openNewLinkDialog(): void {
    const dialogRef = this.dialog.open(NewLinkComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.linkDataService.updateLinks();
    });
  }
}
