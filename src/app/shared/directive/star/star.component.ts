import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {

    @Input() times: number;
    @Input() editMode: boolean;
    @Output() timesChange: EventEmitter<number> = new EventEmitter<number>();

    newTimes: number;

    numberOfTimes: number[];
    numberOfTimesLeft: number[];

    constructor() {
        this.numberOfTimes = [];
        this.numberOfTimesLeft = [];
    }

    ngOnChanges() {
        this.newTimes = this.times;
        this.process();
    }

    process() {
        if (!this.times) {
            this.times = 0;
        }
        this.numberOfTimes = [];
        this.numberOfTimesLeft = [];

        for (let i = 1; i <= this.times; i++) {
            this.numberOfTimes.push(i);
        }
        for (let i = 1; i <= 5 - this.times; i++) {
            this.numberOfTimesLeft.push(i);
        }
    }

    onHover(i: number) {
        if (this.editMode) {
            if (this.times !== i + 1) {
                this.times = i + 1;
                this.process();
            }
        }
    }

    onClick(i: number) {
        this.newTimes = i + 1;
        this.timesChange.emit(this.newTimes);
    }

    onLeave() {
        if (this.editMode) {
            this.times = this.newTimes;
            this.process();
        }
    }

}
