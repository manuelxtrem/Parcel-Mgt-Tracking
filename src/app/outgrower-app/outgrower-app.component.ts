import { Component, OnInit } from '@angular/core';
import { AppSettings, LayoutMenuItem } from '../shared/model';
import { LoginService } from '../shared/service/login.service';
import { GPSService } from '../shared/service/gps.service';
import { AlertService } from '../shared/service/alert.service';
import { LocationService } from '../shared/service/location.service';

@Component({
  selector: 'app-outgrower-app',
  templateUrl: './outgrower-app.component.html',
  styleUrls: ['./outgrower-app.component.css']
})
export class OutgrowerAppComponent implements OnInit {
  title = AppSettings.APP_NAME;
  copyright = 'Emmanuel Osei Agadzi - Final Year Project';
  mainMenu: LayoutMenuItem[];

  constructor(
    private loginService: LoginService,
    private gpsService: GPSService,
    private locationService: LocationService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.mainMenu = [
      {
        title: 'Dashboard',
        svgIcon: 'speedometer',
        link: 'dashboard',
        hasAccess: () => this.loginService.isAdmin()
      },
      {
        title: 'Dashboard',
        svgIcon: 'speedometer',
        link: 'dashboard',
        hasAccess: () => this.loginService.isDriver()
      },
      {
        title: 'Deliveries',
        svgIcon: 'deliverytruck',
        submenu: [
          {
            title: 'New',
            link: 'parcel/new'
          },
          {
            title: 'Transporting',
            link: 'parcel/transporting'
          },
          {
            title: 'Arrivals',
            link: 'parcel/arrivals'
          },
          {
            title: 'Delivered',
            link: 'parcel/delivered'
          }
        ],
        hasAccess: () => this.loginService.isAdmin()
      },
      {
        title: 'Parcels',
        svgIcon: 'deliverytruck',
        link: 'parcel/driver',
        hasAccess: () => this.loginService.isDriver()
      },
      {
        title: 'People',
        svgIcon: 'users',
        submenu: [
          {
            title: 'Customers',
            link: 'people/customer'
          },
          {
            title: 'Administrators',
            link: 'people/administrator'
          },
          {
            title: 'Drivers',
            link: 'people/driver'
          }
        ],
        hasAccess: () => this.loginService.isAdmin()
      },
      {
        title: 'Routes',
        svgIcon: 'route',
        link: 'route',
        hasAccess: () => this.loginService.isAdmin()
      },
      {
        title: "Drivers' Map",
        svgIcon: 'routes',
        link: 'map',
        hasAccess: () => this.loginService.isAdmin()
      },
      {
        title: 'Damages',
        svgIcon: 'cancel',
        link: 'damages',
        hasAccess: () => this.loginService.isAdmin()
      },
      {
        title: 'User Feedback',
        svgIcon: 'star',
        link: 'feedback',
        hasAccess: () => this.loginService.isAdmin()
      },
      {
        title: 'Reports',
        svgIcon: 'growth',
        link: 'report',
        hasAccess: () => this.loginService.isAdmin()
      }
    ];
  }

  doDriverStuff() {
    this.gpsService.getPosition(false).subscribe(
      location => {
        console.log('GPS', location);
        this.locationService.putLocation(
          this.loginService.getUserProfile().id,
          location.coords
        );
      },
      error => {
        this.alert.alert({
          message:
            'Please make sure you are logged in using your mobile device and your Location Settings is set to ON.'
        });
      }
    );
  }
}
