import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-circle-progress',
    templateUrl: './circle-progress.component.html',
    styleUrls: ['./circle-progress.component.css']
})
export class CircleProgressComponent implements OnInit {

    @Input() value = 0;
    @Input() color = '';

    constructor() { }

    ngOnInit() {
    }

}
