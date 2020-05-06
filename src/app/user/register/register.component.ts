import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

function serverSideValidateUsername(
  checkAvailabilityFn: (username: string) => Observable<boolean>
): ValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors> => {
    return checkAvailabilityFn(control.value).pipe(
      map((available) => {
        if (available) return null;
        return { usernameAlreadyExists: true };
      })
    );
  };
}

function comparePasswords(control: AbstractControl): ValidationErrors {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value
    ? null
    : { passwordsDiffer: true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        username: [
          '',
          {
            validators: [Validators.required, Validators.maxLength(16)],
            updateOn: 'blur',
            asyncValidators: serverSideValidateUsername(
              this.authenticationService.checkUsernameAvailability
            ),
          },
        ],
        passwordGroup: this.formBuilder.group(
          {
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', Validators.required],
          },
          { validators: [comparePasswords], updateOn: 'change' }
        ),
      }
      // { updateOn: 'blur' }
    );
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    console.log('submitted');
    this.authenticationService
      .register(
        this.registerForm.value.username,
        this.registerForm.value.passwordGroup.password
      )
      .subscribe(
        (val) => {
          if (val) {
            if (this.authenticationService.redirectUrl) {
              this.router.navigateByUrl(this.authenticationService.redirectUrl);
              this.authenticationService.redirectUrl = undefined;
            } else {
              // TODO: change this to proper url (/category/all or something like that)
              this.router.navigate(['overview']);
            }
          } else {
            this.errorMessage = 'could not login';
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.error instanceof Error) {
            this.errorMessage = `${err.error.message}`;
          } else {
            this.errorMessage = `Error ${err.status}: ${err.error.message}`;
          }
        }
      );
  }

  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }
    if (errors.required) {
      return 'required';
    } else if (errors.minlength) {
      return `must be at least ${errors.minlength.requiredLength} characters`;
    } else if (errors.usernameAlreadyExists) {
      return `username is taken`;
    } else if (errors.passwordsDiffer) {
      return `passwords are not the same`;
    } else if (errors.maxlength) {
      return `username must not be longer than 16 characters`;
    }
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('passwordGroup').get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('passwordGroup').get('confirmPassword');
  }

  get passwordGroup() {
    return this.registerForm.get('passwordGroup');
  }
}
