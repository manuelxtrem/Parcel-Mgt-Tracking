import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../shared/service/alert.service';
import { FeedbackService } from '../../../../shared/service/feedback.service';
import { NotyService } from '../../../../shared/service/noty.service';
import { Result, Feedback, ResponsiveButton, Parcel } from '../../../../shared/model';
import { Observable } from 'rxjs/Rx';
import { LoginService } from '../../../../shared/service/login.service';
import { FeedbackDetailsComponent } from '../feedback-details/feedback-details.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-feedback-list',
    templateUrl: './feedback-list.component.html',
    styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
    loading: boolean;
    personId: number;
    pageIndex = 0;
    pageSize = 10;
    filter: string;
    selectedGroupId: number;
    selectedGroupName: string;
    feedbacksAsync: Observable<Result<Feedback>>;

    feedbackType: string;

    @ViewChild('filterInput') filterInput: ElementRef;

    constructor(private router: Router,
        private dialog: MatDialog,
        private aRoute: ActivatedRoute,
        public loginService: LoginService,
        public feedbackService: FeedbackService,
        public notyService: NotyService,
        private alert: AlertService) {
    }

    ngOnInit() {
        this.personId = this.loginService.getUserProfile().id;

        this.getFeedbacks();

        Observable.fromEvent(this.filterInput.nativeElement, 'keyup')
            .debounceTime(800)
            .distinctUntilChanged()
            .subscribe(() => {
                this.filter = this.filterInput.nativeElement.value;
                this.getFeedbacks();
            });

    }

    getFeedbackType() {
        return this.feedbackType.charAt(0).toUpperCase() + this.feedbackType.substr(1) + 's';
    }

    onPage(event) {
        console.log('onPage-event', event);
        this.pageIndex = +event.pageIndex;
        this.pageSize = +event.pageSize;
        this.getFeedbacks();
    }

    getInitials(feedback: Feedback): string {
        return feedback.customer.surname.charAt(0) + feedback.customer.othername.charAt(0);
    }

    getFeedbacks() {
        this.feedbacksAsync = this.feedbackService.getFeedbacks(this.personId, this.pageIndex, this.pageSize, this.filter);
    }

    onAddFeedback() {
        const dialogRef = this.dialog.open(FeedbackDetailsComponent, {
            width: '350px',
            data: {
                editMode: false,
                feedback: {
                    id: 0,
                    customerId: this.personId,
                    rating: 0,
                    comment: ''
                }
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getFeedbacks();
            }
        });
    }

    onFeedbackSelect(feedback: Feedback) {
        // const dialogRef = this.dialog.open(FeedbackDetailsComponent, {
        //     width: '350px',
        //     data: {
        //         editMode: true,
        //         feedback: JSON.parse(JSON.stringify(feedback))
        //     }
        // });

        // dialogRef.afterClosed().subscribe(result => {
        //     if (result) {
        //         this.getFeedbacks();
        //     }
        // });
    }

    onFeedbackDelete(Id: number) {
        // confirm delete
        this.alert.confirm({
            title: 'Are you sure',
            message: 'Do you want to delete this feedback?',
            confirmText: 'DELETE',
            confirmColor: 'warn',
            callback: (result) => {
                if (result) {
                    this.deleteFeedback(Id);
                }
            }
        });
    }

    deleteFeedback(Id: number) {
        let response;
        this.loading = true;

        // delete feedback
        this.feedbackService.deleteFeedback(Id).subscribe(
            data => response = data,
            (error) => {
                console.log(error);
                this.loading = false;
                // confirm retry delete
                this.alert.confirm({
                    title: 'An error occurred',
                    message: 'Try to delete again?',
                    callback: (status) => {
                        if (status) {
                            this.deleteFeedback(Id);
                        }
                    }
                });
            },
            () => {
                this.loading = false;
                this.notyService.alert(`The feedback has been deleted successfully`);
                this.getFeedbacks();
            }
        );
    }

}
