import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { Observable } from 'rxjs';
import { FilterTermService } from '../services/filter-term.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isDarkTheme: Observable<boolean>;
  constructor(
    private themeService: ThemeService,
    private filterTermService: FilterTermService
  ) {}

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  updateFilterTerm(term: string) {
    this.filterTermService.changeTerm(term);
  }
}
