import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { Observable } from 'rxjs';
import { FilterTermService } from '../services/filter-term.service';
import { AuthenticationService } from '../user/authentication.service';
import { Router } from '@angular/router';
import { HandsetService } from '../services/handset.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isDarkTheme: Observable<boolean>;
  user$;
  isHandset$: Observable<boolean>;
  constructor(
    private themeService: ThemeService,
    private filterTermService: FilterTermService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private handsetService: HandsetService
  ) {}

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.user$ = this.authenticationService.user$;
    this.isHandset$ = this.handsetService.isHandset$;
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  updateFilterTerm(term: string) {
    this.filterTermService.changeTerm(term);
  }

  logout() {
    this.authenticationService.logout();
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  searchVisible(): boolean {
    return (
      this.router.url.includes('/category/id') ||
      this.router.url === '/category/all' ||
      this.router.url === ''
    );
  }
}
