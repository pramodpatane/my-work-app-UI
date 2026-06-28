import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
//import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { AuthInterceptor } from '../app/auth/Interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),
    //provideAnimations()
  ]
};
