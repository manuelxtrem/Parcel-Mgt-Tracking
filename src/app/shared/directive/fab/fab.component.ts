import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-fab',
    templateUrl: './fab.component.html',
    styleUrls: ['./fab.component.css']
})
export class FabComponent implements OnInit {

    // @Input() icon: string;
    @Output() clicked = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() {
    }

    onClicked() {
        this.clicked.emit(true);
    }

}
