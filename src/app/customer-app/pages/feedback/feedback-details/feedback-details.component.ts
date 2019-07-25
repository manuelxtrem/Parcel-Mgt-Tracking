import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotyService } from '../../../../shared/service/noty.service';
import { AlertService } from '../../../../shared/service/alert.service';
import { FeedbackService } from '../../../../shared/service/feedback.service';
import { Feedback } from '../../../../shared/model';
import { PersonService } from '../../../../shared/service/person.service';
import { MapPickerService } from '../../../../shared/service/map-picker.service';
import { RouteService } from '../../../../shared/service/route.service';

@Component({
    selector: 'app-feedback-details',
    templateUrl: './feedback-details.component.html',
    styleUrls: ['./feedback-details.component.css']
})
export class FeedbackDetailsComponent implements OnInit {

    typeAheadFilter: string;
    details: Feedback = new Feedback();
    loading: boolean;
    editMode: boolean;

    constructor(
        public dialogRef: MatDialogRef<FeedbackDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private feedbackService: FeedbackService,
        private notyService: NotyService,
        private alertService: AlertService
    ) {
        this.details = data.feedback;
        this.editMode = data.editMode;
    }

    ngOnInit() {
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
            this.feedbackService.editFeedback(this.details).subscribe(
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
            this.feedbackService.addFeedback(this.details).subscribe(
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

    onCancel() {
        this.dialogRef.close();
    }

}
