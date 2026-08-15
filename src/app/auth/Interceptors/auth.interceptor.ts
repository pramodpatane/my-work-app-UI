import { HttpInterceptorFn } from '@angular/common/http';
import { UserStateService } from '../../core/Services/user.state.service';
import { inject } from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    let token = "";
    const userStateService = inject(UserStateService);
    const user = userStateService.user();
    const userToken = user?.token || '';
    if (userToken) {
      token = userToken;
    }

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
