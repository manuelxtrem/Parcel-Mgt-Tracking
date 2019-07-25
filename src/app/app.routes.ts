import { NgModuleFactoryLoader } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { OutgrowerAppRoutes } from './outgrower-app/outgrower-app.routes';
import { CustomerAppRoutes } from './customer-app/customer-app.routes';
import { LogincustComponent } from './logincust/logincust.component';
import { AuthGuard } from './shared/guard';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

export const routes: Routes = [
    {
        path: '',
        // component: AppComponent,
        redirectTo: (environment.envName === 'driver') ? 'login/driver' : 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LogincustComponent
    },
    {
        path: 'login/driver',
        component: LoginComponent
    },
    {
        path: 'login/staff',
        component: LoginComponent
    },
    {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [AuthGuard]
    },
    ...OutgrowerAppRoutes,
    ...CustomerAppRoutes
];

export const AppRoutes = RouterModule.forRoot(routes, {
    useHash: true
});
