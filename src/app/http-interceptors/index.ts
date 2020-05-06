import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthticationInterceptor } from './AuthenticationInterceptor';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthticationInterceptor,
    multi: true,
  },
];
