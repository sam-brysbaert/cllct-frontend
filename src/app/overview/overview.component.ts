import { Component, OnInit } from '@angular/core';
import { LinkDataService } from '../link/link-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  currentCategoryId: number;
  constructor(
    private linkDataService: LinkDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => (this.linkDataService.categoryId = +params['id'])
    );
  }
}
