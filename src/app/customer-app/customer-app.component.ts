import { Component, OnInit } from '@angular/core';
import { AppSettings, LayoutMenuItem } from '../shared/model';
import { LoginService } from '../shared/service/login.service';

@Component({
  selector: 'app-customer-app',
  templateUrl: './customer-app.component.html',
  styleUrls: ['./customer-app.component.css']
})
export class CustomerAppComponent implements OnInit {
  title = AppSettings.APP_NAME;
  mainMenu: LayoutMenuItem[];
  background = 'assets/img/service12.jpg';

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.mainMenu = [
      // {
      //     title: 'Dashboard',
      //     svgIcon: 'speedometer',
      //     link: 'dashboard',
      //     hasAccess: () => true
      // },
      {
        title: 'Parcels',
        svgIcon: 'package',
        link: 'track',
        hasAccess: () => true
      },
      {
        title: 'Damages',
        svgIcon: 'cancel',
        link: 'damage',
        hasAccess: () => true
      },
      {
        title: 'Feedback',
        svgIcon: 'thumbstars',
        link: 'feedback',
        hasAccess: () => true
      }
    ];
  }
}
