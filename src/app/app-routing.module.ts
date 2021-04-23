import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule ),
        canActivate: [ LoginGuard ],
    },
    {
        path: 'register',
        loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule ),
        canActivate: [ LoginGuard ],
    },
    {
        path: 'snazzy',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule ),
        canActivate: [ AuthGuard ],
    },


];

@NgModule( {
               imports: [
                   RouterModule.forRoot( routes, { preloadingStrategy: PreloadAllModules } ),
               ],
               exports: [ RouterModule ],
           } )
export class AppRoutingModule {}
