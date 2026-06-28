import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "",
        pathMatch: 'full'
    },
    { 
        path: "",
        loadComponent: () => 
            import('../app/auth/Components/login-component/login-component')
            .then(m => m.LoginComponent)
    },
    {
        path: "",
        loadChildren: () => 
            import('../app/core/core.routes')
            .then(m => m.Core_Routes)
    },
    {
        path: "",
        loadChildren: () => 
            import('../app/feature/feature.route')
            .then(m => m.Feature_Routes)
    },
    // Fallback
    {
        path: '**',
        redirectTo: ''
    }
];
