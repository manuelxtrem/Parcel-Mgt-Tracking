import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../shared/service/alert.service';
import { FeedbackService } from '../../../../shared/service/feedback.service';
import { NotyService } from '../../../../shared/service/noty.service';
import { Result, Feedback, ResponsiveButton } from '../../../../shared/model';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'app-user-feedback-list',
    templateUrl: './user-feedback-list.component.html',
    styleUrls: ['./user-feedback-list.component.css']
})
export class UserFeedbackListComponent implements OnInit {
    loading: boolean;
    pageIndex = 0;
    pageSize = 10;
    filter: string;
    selectedGroupId: number;
    selectedGroupName: string;
    feedbacksAsync: Observable<Result<Feedback>>;
    actionButtons: ResponsiveButton[];

    feedbackType: string;

    @ViewChild('filterInput') filterInput: ElementRef;

    constructor(private router: Router,
        private aRoute: ActivatedRoute,
        public feedbackService: FeedbackService,
        public notyService: NotyService,
        private alert: AlertService) {
    }

    ngOnInit() {
        this.actionButtons = [
            {
                title: 'Delete',
                icon: 'delete_forever',
                color: 'warning',
                callback: (data: number) => {
                    this.onFeedbackDelete(data);
                }
            }
        ];

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

    getInitials(feedback: Feedback): string {
        return feedback.customer.surname.charAt(0) + feedback.customer.othername.charAt(0);
    }

    getFeedbacks() {
        console.log('pager-pageIndex', this.pageIndex);
        console.log('pager-pageSize', this.pageSize);
        this.feedbacksAsync = this.feedbackService.getFeedbacks(0, this.pageIndex, this.pageSize, this.filter);
    }

    onPage(event) {
        console.log('onPage-event', event);
        this.pageIndex = +event.pageIndex;
        this.pageSize = +event.pageSize;
        this.getFeedbacks();
    }

    onFeedbackSelect(Id: number) {
        // this.router.navigateByUrl(`details/${Id}`);
        // this.router.navigate(['details', Id], { relativeTo: this.aRoute });
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

    selectGroup(Id: number) {
        console.log('selecting', 'group ' + Id);
        this.selectedGroupId = Id;
        this.selectedGroupName = `Group ${Id}`;
    }

}
