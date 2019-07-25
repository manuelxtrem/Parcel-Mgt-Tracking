import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Person } from '../../../model';
import { PersonService } from '../../../service/person.service';
import { NotyService } from '../../../service/noty.service';
import { AlertService } from '../../../service/alert.service';
import { PersonDetailComponent } from '../../person-detail/person-detail.component';

@Component({
    selector: 'app-person-family-edit',
    templateUrl: './person-family-edit.component.html',
    styleUrls: ['./person-family-edit.component.css']
})
export class PersonFamilyEditComponent implements OnInit {

    // details: Person;
    personId: number;
    parentID: number;
    personType: string;
    editMode: boolean;
    loading: boolean;
    years: Date[];
    levels: string[];

    @ViewChild('personDetail') personDetail: PersonDetailComponent;

    constructor(
        public dialogRef: MatDialogRef<PersonFamilyEditComponent>,
        private personService: PersonService,
        private notyService: NotyService,
        private alertService: AlertService
    ) {
    }

    ngOnInit() {
        this.levels = [
            'Primary',
            'Junior High',
            'Senior High',
            'Undergraduate',
            'Postgraduate'
        ];

        this.years = [];
        let i = new Date().getFullYear();

        for (i; i >= 1970; i--) {
            this.years.push(new Date(`01/01/${i}`));
        }

        // this.dialogRef.disableClose = true;
        this.dialogRef.updateSize('350px');
        this.dialogRef.beforeClose().subscribe(
            () => {
                this.notyService.dismissAll();
            }
        );
    }

    onSave() {
        if (this.loading) {
            return;
        }
        this.personDetail.onSave();
    }

    afterSave(status: boolean) {
        if (status) {
            this.dialogRef.close(true);
        }
    }

    afterAdd(status: boolean) {
        if (status) {
            this.dialogRef.close(true);
        }
    }

    deleteEntry() {
        if (this.loading) {
            return;
        }

        this.loading = true;
        this.notyService.dismissAll();

        let result;

        this.personService.deletePerson(this.personId).subscribe(
            res => result = res,
            (error) => {
                this.loading = false;
                this.alertService.confirm({
                    title: 'An error occurred',
                    message: 'Could not delete this member. Do you want to retry?',
                    confirmText: 'RETRY',
                    confirmColor: 'warn',
                    callback: (ans) => {
                        if (ans) {
                            this.deleteEntry();
                        }
                    }
                });
            },
            () => {
                this.loading = false;
                this.notyService.alert('Member has been deleted.');
                this.dialogRef.close(true);
            }
        );
    }

    onDelete() {
        this.alertService.confirm({
            title: 'Are you sure?',
            message: 'Do you want to delete this entry?',
            confirmText: 'YES',
            confirmColor: 'warn',
            callback: (result) => {
                if (result) {
                    this.deleteEntry();
                }
            }
        });
    }

    onCancel() {
        this.dialogRef.close();
    }

}
