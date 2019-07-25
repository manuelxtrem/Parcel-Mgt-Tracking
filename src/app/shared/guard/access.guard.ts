import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../service/login.service';
import { AlertService } from '../service/alert.service';
import { UserType } from '../model/user';

@Injectable()
export class AccessGuard implements CanActivate {

    granted: boolean;

    constructor(
        private loginService: LoginService,
        private alertService: AlertService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const userType = this.loginService.getUserProfile().personType;
        const routeParent = state.root.children[0].routeConfig.path;

        console.log('ACCESS routeParent', routeParent);
        console.log('ACCESS userType', userType);

        switch (userType.toLowerCase()) {
            case UserType.ADMIN:
                this.granted = routeParent === 'manage';
                break;

            case UserType.DRIVER:
                this.granted = routeParent === 'driver';
                break;

            case UserType.CUSTOMER:
                this.granted = routeParent === 'customer';
                break;

            default:
                this.granted = false;
                break;
        }

        if (!this.granted) {
            this.alertService.alert({
                title: 'Access Denied',
                message: 'Sorry, you do not have access to this resource.'
            });
        }

        return this.granted;
    }
}
