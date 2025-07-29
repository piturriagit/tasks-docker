import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { Login } from './login/login';
import { Home } from './home/home';
import { Error } from './error/error';
import { PageNotFound } from './page-not-found/page-not-found';


export const routes: Routes = [
    { path: '', pathMatch: 'full', component: Home, canActivate: [AuthGuard] },
    { path: 'login', component: Login },
    { path: 'error', component: Error , canActivate: [AuthGuard] },
    { path: '**', component: PageNotFound } // Ruta comodín para 404
];