import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../shared/service/alert.service';
import { GroupService } from '../../../../shared/service/group.service';
import { NotyService } from '../../../../shared/service/noty.service';
import { Result, Group, ResponsiveButton } from '../../../../shared/model';
import { MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Rx';
// import 'rxjs/add/operator/of';
import { DataSource } from '@angular/cdk/collections';

@Component({
    selector: 'app-group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
    pageIndex = 0;
    pageSize = 10;
    pageTotal = 0;

    loading: boolean;
    filter: string;
    selectedGroupId: number;
    selectedGroupName: string;
    displayedColumns = ['name', 'id'];
    dataSource: GroupDataSource | null;
    groupsData: Group[];
    actionButtons: ResponsiveButton[];

    @ViewChild('filterInput') filterInput: ElementRef;

    constructor(private router: Router,
        private route: ActivatedRoute,
        public groupService: GroupService,
        public notyService: NotyService,
        private alert: AlertService) {
    }

    ngOnInit() {
        this.actionButtons = [
            {
                title: 'Details',
                icon: 'assignment',
                callback: (data) => {
                    this.onGroupSelect(data);
                }
            },
            {
                title: 'Sub-Groups',
                icon: 'group',
                callback: (data) => {
                    this.onGroupSelect(data);
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

        this.getGroups();
    }

    getGroups() {
        this.alert.startLoading();

        let results: Result<Group>;

        this.groupService.getGroups(this.pageIndex, this.pageSize, this.filter).subscribe(
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

    onGroupSelect(Id: number) {
        // this.router.navigate(['details', Id], {relativeTo: this.route});
        // this.router.navigateByUrl(`details/${Id}`);
    }

    onGroupDelete(Id: number) {
        // confirm delete
        this.alert.confirm({
            title: 'Are you sure',
            message: 'Do you want to delete this gorup?',
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
        this.groupService.deleteGroup(Id).subscribe(
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
                this.notyService.alert(`The group has been deleted successfully`);
                this.getGroups();
            }
        );
    }

    selectGroup(Id: number) {
        console.log('selecting', 'group ' + Id);
        this.selectedGroupId = Id;
        this.selectedGroupName = `Group ${Id}`;
    }


    // onDeleteMultipleMembers() {
    //     const plural = (this.tableInfo.selection.length > 1) ? 'members' : 'member';

    //     // confirm delete
    //     const dialogRef = this.dialog.open(ConfirmDialogComponent);
    //     dialogRef.componentInstance.title = 'Are you sure';
    //     dialogRef.componentInstance.message = `Do you want to delete the selected ${plural}?`;
    //     dialogRef.componentInstance.confirmText = 'DELETE';
    //     dialogRef.componentInstance.confirmColor = 'warn';

    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result) {
    //             this.deleteMultiple();
    //         }
    //     });
    // }

    // deleteMultiple() {
    //     let response: Response;
    //     const plural = (this.tableInfo.selection.length > 1) ? 'members' : 'member';
    //     this.loading = true;

    //     // delete member
    //     this.memberService.deleteMultiple(this.tableInfo.selection).subscribe(
    //         data => response = data,
    //         (error) => {
    //             console.log(error);
    //             this.loading = false;

    //             // confirm retry delete
    //             const dialogRef1 = this.dialog.open(ConfirmDialogComponent);
    //             dialogRef1.componentInstance.title = 'An error occurred';
    //             dialogRef1.componentInstance.message = 'Try to delete again?';
    //             dialogRef1.componentInstance.confirmText = 'DELETE';
    //             dialogRef1.componentInstance.confirmColor = 'warn';

    //             dialogRef1.afterClosed().subscribe(status => {
    //                 if (status) {
    //                     this.deleteMultiple();
    //                 }
    //             });
    //         },
    //         () => {
    //             this.loading = false;

    //             if (response.status) {
    //                 Noty.show(`The ${plural} have been deleted successfully`);
    //             } else {
    //                 const dialogRef2 = this.dialog.open(AlertDialogComponent);
    //                 dialogRef2.componentInstance.title = 'Heads up!';
    //                 dialogRef2.componentInstance.message = 'The ${plural} have already been deleted or does not exist';
    //             }
    //             this.getMembers();
    //         }
    //     );
    // }

}

// export class ExampleDatabase {
//     /** Stream that emits whenever the data has been modified. */
//     dataChange: BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>([]);
//     get data(): Group[] { return this.dataChange.value; }
//     groupsObservale: Observable<Group[]>;
//     totalItems: number;
//     pageIndex = 0;
//     pageSize = 25;

//     constructor(public groupService: GroupService) {
//         // get data
//         this.retreiveGroups()
//             // this.groupService.getGroups('Group', 0, 10)
//             .subscribe((result) => {
//                 this.dataChange.next(result);
//             });
//     }

//     retreiveGroups(): Observable<Group[]> {
//         this.groupsObservale = this.groupService.getGroups(this.pageIndex, this.pageSize)
//             .map((res: Result<Group>) => {
//                 console.log('resuts gotten');
//                 this.totalItems = res.total;
//                 return res.data;
//             });

//         this.groupsObservale
//             .subscribe((result) => {
//                 this.dataChange.next(result);
//             });

//         return this.groupsObservale;
//     }
// }

export class GroupDataSource extends DataSource<any> {
    constructor(
        private data: Group[]) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Group[]> {
        return Observable.of(this.data);
    }

    disconnect() {
    }
}
