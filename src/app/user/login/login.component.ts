import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    this.authenticationService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        (val) => {
          if (val) {
            if (this.authenticationService.redirectUrl) {
              this.router.navigateByUrl(this.authenticationService.redirectUrl);
              this.authenticationService.redirectUrl = undefined;
            } else {
              this.router.navigate(['/overview']);
            }
          } else {
            this.errorMessage = `Could not login`;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.error instanceof Error) {
            this.errorMessage = `Error: ${err.error.message}`;
          } else {
            this.errorMessage = `Error ${err.status}: ${err.error}`;
          }
        }
      );
  }
}
