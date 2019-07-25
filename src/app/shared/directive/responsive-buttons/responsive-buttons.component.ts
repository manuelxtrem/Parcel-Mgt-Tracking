import { Component, OnInit, Input } from '@angular/core';
import { ResponsiveButton } from '../../model/index';

@Component({
    selector: 'app-responsive-buttons',
    templateUrl: './responsive-buttons.component.html',
    styleUrls: ['./responsive-buttons.component.css']
})
export class ResponsiveButtonsComponent implements OnInit {

    windowWidth: number;
    deviceXS = false;
    deviceSM = false;
    deviceMD = false;
    deviceLG = false;

    @Input() buttons: ResponsiveButton[];
    @Input() buttonsData: string;

    constructor() { }

    ngOnInit() {
        this.onResize();
    }

    onResize() {
        this.windowWidth = window.innerWidth;
        this.deviceXS = (window.innerWidth <= 540);
        this.deviceSM = (window.innerWidth > 540 && window.innerWidth <= 768);
        // this.deviceSM = (window.innerWidth <= 768);
        this.deviceMD = (window.innerWidth > 768 && window.innerWidth < 900);
        this.deviceLG = (window.innerWidth >= 900);
    }

}
