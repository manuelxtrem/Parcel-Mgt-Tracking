import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../shared/service/alert.service';
import { SubgroupService } from '../../../../shared/service/subgroup.service';
import { NotyService } from '../../../../shared/service/noty.service';
import { Result, SubGroup, ResponsiveButton } from '../../../../shared/model';
import { MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { DataSource } from '@angular/cdk/collections';

@Component({
    selector: 'app-subgroup-list',
    templateUrl: './subgroup-list.component.html',
    styleUrls: ['./subgroup-list.component.css']
})
export class SubgroupListComponent implements OnInit, OnChanges {
    pageIndex = 0;
    pageSize = 10;
    pageTotal = 0;

    loading: boolean;
    filter: string;
    displayedColumns = ['name', 'id'];
    dataSource: GroupDataSource | null;
    groupsData: SubGroup[];
    actionButtons: ResponsiveButton[];

    @Input() selectedGroupId: number;
    @Input() selectedGroupName: string;

    @ViewChild('filterInput') filterInput: ElementRef;

    constructor(private router: Router,
        private route: ActivatedRoute,
        public subgroupService: SubgroupService,
        public notyService: NotyService,
        private alert: AlertService) {
    }

    ngOnInit() {
        this.actionButtons = [
            {
                title: 'Members',
                icon: 'supervisor_account',
                callback: (data) => {
                    this.onMembersSelect(data);
                }
            },
            {
                title: 'Delete',
                icon: 'delete_forever',
                color: 'warning',
                callback: (data: number) => {
                    this.onGroupDelete(data);
                }
            }
        ];

        Observable.fromEvent(this.filterInput.nativeElement, 'keyup')
            .debounceTime(800)
            .distinctUntilChanged()
            .subscribe(() => {
                this.filter = this.filterInput.nativeElement.value;
                this.pageIndex = 0;
                this.getGroups();
            });

    }

    ngOnChanges() {
        if (this.selectedGroupId) {
            this.getGroups();
        }
    }

    getGroups() {
        this.alert.startLoading();

        let results: Result<SubGroup>;

        this.subgroupService.getSubGroups(this.selectedGroupId, this.pageIndex, this.pageSize, this.filter).subscribe(
            result => results = result,
            (error) => {
                console.log('Error', error);
                this.alert.stopLoading();
            },
            () => {
                if (results.data) {
                    this.groupsData = results.data;
                    this.pageTotal = results.total;
                    this.dataSource = new GroupDataSource(this.groupsData);
                } else {
                    // TODO not what we expected
                    console.log('ERROR', 'something diff here... CHECK IT OUT');
                }
                this.alert.stopLoading();
            }
        );
    }

    onPagination(event) {
        console.log('event', event);
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.getGroups();
    }

    onMembersSelect(Id: number) {
        this.router.navigate(['farmer', Id]);
    }

    onGroupDelete(Id: number) {
        // confirm delete
        this.alert.confirm({
            title: 'Are you sure',
            message: 'Do you want to delete this sub-group?',
            confirmText: 'DELETE',
            confirmColor: 'warn',
            callback: (result) => {
                if (result) {
                    this.deleteGroup(Id);
                }
            }
        });
    }

    deleteGroup(Id: number) {
        let response;
        this.loading = true;

        // delete member
        this.subgroupService.deleteSubGroup(Id).subscribe(
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
                            this.deleteGroup(Id);
                        }
                    }
                });
            },
            () => {
                this.loading = false;
                this.notyService.alert(`The sub-group has been deleted successfully`);
                this.getGroups();
            }
        );
    }
}

export class GroupDataSource extends DataSource<any> {
    constructor(
        private data: SubGroup[]) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<SubGroup[]> {
        return Observable.of(this.data);
    }

    disconnect() {
    }
}
