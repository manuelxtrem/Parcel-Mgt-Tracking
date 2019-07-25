import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Education } from '../../model';
import { AlertService } from '../../service/alert.service';
import { NotyService } from '../../service/noty.service';
import { EducationService } from '../../service/education.service';
import { MatDialog } from '@angular/material';
import { PersonEduEditComponent } from './person-edu-edit/person-edu-edit.component';

@Component({
    selector: 'app-person-edu',
    templateUrl: './person-edu.component.html',
    styleUrls: ['./person-edu.component.css']
})

export class PersonEduComponent implements OnInit, OnChanges {

    @Input() personID: number;
    @Input() load: boolean;
    educationDetail: Education[];
    loading: boolean;
    editMode: boolean;

    constructor(
        private dialog: MatDialog,
        private educationService: EducationService,
        private notyService: NotyService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.educationDetail = [];
    }

    ngOnChanges() {
        if (this.load) {
            this.getEducationDetails();
        }
    }

    getEducationDetails() {
        this.loading = true;

        this.educationService.getEducations(this.personID).subscribe(
            details => this.educationDetail = details,
            (error) => {
                this.loading = false;
                this.alertService.confirm({
                    title: 'An error occurred',
                    message: 'Could not get the details of this education. Do you want to retry?',
                    confirmText: 'YES',
                    callback: (result) => {
                        if (result) {
                            this.getEducationDetails();
                        }
                    }
                });
            },
            () => {
                this.loading = false;
            }
        );
    }

    addEntry() {
        const dialogRef = this.dialog.open(PersonEduEditComponent);
        dialogRef.componentInstance.editMode = false;
        dialogRef.componentInstance.details = {
            id: 0,
            personId: this.personID,
            institution: '',
            institutionLocation: '',
            level: '',
            year: new Date()
        };

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getEducationDetails();
            }
        });
    }

    onItemSelect(index, item) {
        console.log('editing changes');

        const dialogRef = this.dialog.open(PersonEduEditComponent);
        dialogRef.componentInstance.editMode = true;
        dialogRef.componentInstance.details = {
            id: item.id,
            personId: item.personId,
            institution: item.institution,
            institutionLocation: item.institutionLocation,
            level: item.level,
            year: item.year
        };

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getEducationDetails();
            }
        });
    }

    refresh() {
        this.getEducationDetails();
    }
}
