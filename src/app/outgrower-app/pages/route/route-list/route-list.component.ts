import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../shared/service/alert.service';
import { RouteService } from '../../../../shared/service/route.service';
import { NotyService } from '../../../../shared/service/noty.service';
import { Result, Route, ResponsiveButton } from '../../../../shared/model';
import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RouteDetailsComponent } from '../route-details/route-details.component';

@Component({
    selector: 'app-route-list',
    templateUrl: './route-list.component.html',
    styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {
    loading: boolean;
    pageIndex = 0;
    pageSize = 10;
    filter: string;
    routesAsync: Observable<Result<Route>>;
    actionButtons: ResponsiveButton[];

    @ViewChild('filterInput') filterInput: ElementRef;

    constructor(private router: Router,
        private aRoute: ActivatedRoute,
        private dialog: MatDialog,
        public routeService: RouteService,
        public noty: NotyService,
        private alertService: AlertService) {
    }

    ngOnInit() {
        this.actionButtons = [
            {
                title: 'Details',
                icon: 'info_outline',
                callback: (data: Route) => {
                    this.onRouteSelect(data);
                }
            },
            {
                title: 'Delete',
                icon: 'delete_forever',
                color: 'warning',
                callback: (data: Route) => {
                    this.onRouteDelete(data);
                }
            }
        ];

        this.getRoutes();

        Observable.fromEvent(this.filterInput.nativeElement, 'keyup')
            .debounceTime(800)
            .distinctUntilChanged()
            .subscribe(() => {
                this.filter = this.filterInput.nativeElement.value;
                this.getRoutes();
            });

    }

    getRoutes() {
        this.routesAsync = this.routeService.getRoutes(this.pageIndex, this.pageSize, this.filter);
    }

    onPage(event) {
        console.log('onPage-event', event);
        this.pageIndex = +event.pageIndex;
        this.pageSize = +event.pageSize;
        this.getRoutes();
    }

    onRouteSelect(route: Route) {
        const dialogRef = this.dialog.open(RouteDetailsComponent, {
            width: '350px',
            data: {
                editMode: true,
                route: JSON.parse(JSON.stringify(route))
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getRoutes();
            }
        });
    }

    onRouteDelete(route: Route) {
        // confirm delete
        this.alertService.confirm({
            title: 'Are you sure',
            message: 'Do you want to delete this route?',
            confirmText: 'DELETE',
            confirmColor: 'warn',
            callback: (result) => {
                if (result) {
                    this.deleteRoute(route.id);
                }
            }
        });
    }

    deleteRoute(Id: number) {
        let response;
        this.loading = true;

        // delete route
        this.routeService.deleteRoute(Id).subscribe(
            data => response = data,
            (error) => {
                console.log(error);
                this.loading = false;
                // confirm retry delete
                this.alertService.confirm({
                    title: 'An error occurred',
                    message: 'Try to delete again?',
                    callback: (status) => {
                        if (status) {
                            this.deleteRoute(Id);
                        }
                    }
                });
            },
            () => {
                this.loading = false;
                this.noty.alert(`The route has been deleted successfully`);
                this.getRoutes();
            }
        );
    }

    onAddClick() {
        const dialogRef = this.dialog.open(RouteDetailsComponent, {
            width: '350px',
            data: {
                editMode: false,
                route: {
                    source: '',
                    sourceLat: 0,
                    sourceLong: 0,
                    destination: '',
                    destinationLat: 0,
                    destinationLong: 0,
                }
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getRoutes();
            }
        });
    }
}
