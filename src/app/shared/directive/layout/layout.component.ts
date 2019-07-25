import {
  Component,
  OnInit,
  OnChanges,
  NgZone,
  ViewChild,
  Input
} from '@angular/core';
import { LayoutMenuItem, Person } from '../../model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { IconsService } from '../../service/icons.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnChanges {
  windowWidth: number;
  windowMode = 'over';
  sidebarOpened = false;
  todate = new Date();

  @Input() title: string;
  @Input() copyright: string;
  @Input() customer = false;
  @Input() userProfile: Person;
  @Input() menuItems: LayoutMenuItem[];

  @ViewChild('sidenav') sidenav: any;

  constructor(
    private loginService: LoginService,
    private aRoute: ActivatedRoute,
    private ngZone: NgZone,
    private router: Router,
    iconService: IconsService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconService.getSVGIcons().forEach(icon => {
      iconRegistry.addSvgIcon(
        icon,
        sanitizer.bypassSecurityTrustResourceUrl(`assets/svg/${icon}.svg`)
      );
    });
  }

  ngOnInit() {
    this.onResize();

    // this.router.events.subscribe(e => {
    //     console.log("LINKEVENTS");
    //     if (e instanceof NavigationEnd) {
    //         this.workOnMenu();
    //     }
    // });

    this.userProfile = this.loginService.getUserProfile();
  }

  ngOnChanges() {
    if (!this.copyright) {
      this.copyright = this.title;
    }
    this.workOnMenu();
  }

  workOnMenu() {
    // check urls and make them active respectively
    if (this.menuItems) {
      this.menuItems.forEach(item => {
        if (item.submenu) {
          let expandStatus = false;
          item.submenu.forEach(subitem => {
            if (
              this.router.isActive(
                this.router.createUrlTree([subitem.link], {
                  relativeTo: this.aRoute
                }),
                false
              )
            ) {
              expandStatus = true;
            }
          });
          item.expand = expandStatus;
        }
      });
    }
  }

  onResize() {
    if (window.innerWidth <= 768) {
      this.windowMode = 'over';
      this.sidebarOpened = false;
      this.sidenav.close();
    } else {
      this.windowMode = 'side';
      this.sidebarOpened = true;
      this.sidenav.open();
    }
  }

  onMenuItemClick() {
    if (this.windowMode === 'over') {
      this.sidenav.close();
    }
  }

  onLogout() {
    this.router.navigateByUrl('/logout');
  }

  onProfile() {
    this.router.navigateByUrl('profile');
  }
}
