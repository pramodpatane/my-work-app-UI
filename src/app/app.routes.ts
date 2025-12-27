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
            import('../auth/Components/login-component/login-component')
            .then(m => m.LoginComponent)
    },
    {
        path: "core",
        loadChildren: () => 
            import('../core/core.routes')
            .then(m => m.Core_Routes)
    },
    {
        path: "feature",
        loadChildren: () => 
            import('../feature/feature.route')
            .then(m => m.Feature_Routes)
    },
    // Fallback
    {
        path: '**',
        redirectTo: ''
    }
];
