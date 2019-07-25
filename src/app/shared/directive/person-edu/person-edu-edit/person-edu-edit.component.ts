import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Education } from '../../../model';
import { EducationService } from '../../../service/education.service';
import { NotyService } from '../../../service/noty.service';
import { AlertService } from '../../../service/alert.service';

@Component({
    selector: 'app-person-edu-edit',
    templateUrl: './person-edu-edit.component.html',
    styleUrls: ['./person-edu-edit.component.css']
})
export class PersonEduEditComponent implements OnInit {

    details: Education;
    editMode: boolean;
    loading: boolean;
    years: Date[];
    levels: string[];

    constructor(
        public dialogRef: MatDialogRef<PersonEduEditComponent>,
        private educationService: EducationService,
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

        this.loading = true;
        this.notyService.dismissAll();
        let result;

        if (this.editMode) {
            // we're saving edited chages
            this.educationService.editEducation(this.details).subscribe(
                res => result = res,
                (error) => {
                    this.loading = false;
                    this.alertService.confirm({
                        title: 'An error occurred',
                        message: 'Could not save changes. Do you want to retry?',
                        confirmText: 'RETRY',
                        confirmColor: 'warn',
                        callback: (ans) => {
                            if (ans) {
                                this.onSave();
                            }
                        }
                    });
                },
                () => {
                    this.loading = false;
                    this.notyService.alert('Changes have been saved successfully.');
                    this.dialogRef.close(true);
                }
            );
        } else {
            // we're adding new details
            this.educationService.addEducation(this.details).subscribe(
                res => result = res,
                (error) => {
                    this.loading = false;
                    this.alertService.confirm({
                        title: 'An error occurred',
                        message: 'Could not save changes. Do you want to retry?',
                        confirmText: 'RETRY',
                        confirmColor: 'warn',
                        callback: (ans) => {
                            if (ans) {
                                this.onSave();
                            }
                        }
                    });
                },
                () => {
                    this.loading = false;
                    this.notyService.alert('The entry has been saved successfully.');
                    this.dialogRef.close(true);
                }
            );
        }
    }

    deleteEntry() {
        if (this.loading) {
            return;
        }

        this.loading = true;
        this.notyService.dismissAll();

        let result;

        this.educationService.deleteEducation(this.details.id).subscribe(
            res => result = res,
            (error) => {
                this.loading = false;
                this.alertService.confirm({
                    title: 'An error occurred',
                    message: 'Could not delete. Do you want to retry?',
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
                this.notyService.alert('Entry has been deleted.');
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
