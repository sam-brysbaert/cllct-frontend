import { Component, OnInit } from '@angular/core';
import { LinkDataService } from '../link/link-data.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryDataService } from '../category/category-data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  constructor(
    private linkDataService: LinkDataService,
    private categoryDataService: CategoryDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryDataService
        .getBy(+params['id'])
        .subscribe((cat) => (this.linkDataService.currentCategory = cat));
    });
  }
}
