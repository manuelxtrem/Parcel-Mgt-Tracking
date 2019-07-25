import { Component, OnInit } from '@angular/core';
// import { environment } from '../environments/environment';
import { Title } from '@angular/platform-browser';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { LoginService } from './shared/service/login.service';
import { AppSettings } from './shared/model';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { IconsService } from './shared/service/icons.service';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private router: Router,
        private titleService: Title,
        private loginService: LoginService,
        iconService: IconsService,
        iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer
    ) {

        iconService.getSVGIcons().forEach(icon => {
            iconRegistry.addSvgIcon(
                icon,
                sanitizer.bypassSecurityTrustResourceUrl(`assets/svg/{icon}.svg`)
            );
        });

    }

    ngOnInit() {
        // set page title
        this.titleService.setTitle(AppSettings.APP_NAME);

        // if (environment.envName === 'driver') {
        //     this.router.navigateByUrl('/login/driver');
        // } else {
        //     this.router.navigateByUrl('/login');
        // }

        /*/ check urls and make them active respectively
        this.router.events.subscribe(e => {
            if (e instanceof NavigationStart) {
                console.log('nav started', e);
            } else if (e instanceof NavigationEnd) {
                console.log('nav ended');
            }
        }); */
    }
}
