import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-default-placeholder',
    templateUrl: './default-placeholder.component.html',
    styleUrls: ['./default-placeholder.component.css']
})
export class DefaultPlaceholderComponent implements OnInit {

    @Input() icon: string;
    @Input() text: string;

    constructor() { }

    ngOnInit() {
    }

}
