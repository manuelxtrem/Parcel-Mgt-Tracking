import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-report-main',
  templateUrl: './report-main.component.html',
  styleUrls: ['./report-main.component.css']
})
export class ReportMainComponent implements OnInit {
  icons = ['users', 'routes', 'box', 'thumbstars'];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.icons.forEach(icon => {
      iconRegistry.addSvgIcon(
        icon,
        sanitizer.bypassSecurityTrustResourceUrl(`assets/svg/${icon}.svg`)
      );
    });
  }

  ngOnInit() {}
}
