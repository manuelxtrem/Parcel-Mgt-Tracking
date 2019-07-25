import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { GPSService } from '../shared/service/gps.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private gpsService: GPSService) {}

  ngOnInit() {
    this.gpsService.destroy();

    setTimeout(() => {
      if (environment.envName === 'driver') {
        this.router.navigateByUrl('/login/driver');
      } else {
        this.router.navigateByUrl('/login');
      }
    }, 3000);
  }
}
