import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from './core/theme.service';
import { FilterTermService } from './shared/filter-term.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'cllct';
  isDarkTheme: Observable<boolean>;
  filterTerm: string;

  constructor(
    private themeService: ThemeService,
    private filterTermService: FilterTermService
  ) {}

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.filterTermService.currentTerm.subscribe(
      (term) => (this.filterTerm = term)
    );
  }
}
