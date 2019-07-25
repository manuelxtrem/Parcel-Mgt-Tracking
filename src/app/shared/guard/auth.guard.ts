import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../service/login.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private loginService: LoginService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.loginService.isUserLoggedIn()) {
            // logged in so return true
            console.log('logged in user');
            return true;
        }

        const routeParent = route.url[0].path;

        // not logged in so redirect to login page with the return url
        console.log('login no auth');
        if (routeParent && routeParent === 'customer') {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        // } else if (routeParent && routeParent === 'driver') {
        //     this.router.navigate(['/login/driver'], { queryParams: { returnUrl: state.url } });
        } else {
            if (environment.envName === 'driver') {
                this.router.navigate(['/login/driver'], { queryParams: { returnUrl: state.url } });
            } else {
                this.router.navigate(['/login/staff'], { queryParams: { returnUrl: state.url } });
            }
        }
        return false;
    }
}
