import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../shared/service/alert.service';
import { DamageService } from '../../../../shared/service/damage.service';
import { NotyService } from '../../../../shared/service/noty.service';
import { Result, Damage, ResponsiveButton, Parcel } from '../../../../shared/model';
import { Observable } from 'rxjs/Rx';
import { LoginService } from '../../../../shared/service/login.service';
import { DamageDetailsComponent } from '../damage-details/damage-details.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-damage-list',
    templateUrl: './damage-list.component.html',
    styleUrls: ['./damage-list.component.css']
})
export class DamageListComponent implements OnInit {
    loading: boolean;
    personId: number;
    pageIndex = 0;
    pageSize = 10;
    filter: string;
    selectedGroupId: number;
    selectedGroupName: string;
    damagesAsync: Observable<Result<Damage>>;

    damageType: string;

    @ViewChild('filterInput') filterInput: ElementRef;

    constructor(private router: Router,
        private dialog: MatDialog,
        private aRoute: ActivatedRoute,
        public loginService: LoginService,
        public damageService: DamageService,
        public notyService: NotyService,
        private alert: AlertService) {
    }

    ngOnInit() {
        this.personId = this.loginService.getUserProfile().id;

        this.getDamages();

        Observable.fromEvent(this.filterInput.nativeElement, 'keyup')
            .debounceTime(800)
            .distinctUntilChanged()
            .subscribe(() => {
                this.filter = this.filterInput.nativeElement.value;
                this.getDamages();
            });

    }

    getDamageType() {
        return this.damageType.charAt(0).toUpperCase() + this.damageType.substr(1) + 's';
    }

    onPage(event) {
        console.log('onPage-event', event);
        this.pageIndex = +event.pageIndex;
        this.pageSize = +event.pageSize;
        this.getDamages();
    }

    getInitials(damage: Damage): string {
        return damage.customer.surname.charAt(0) + damage.customer.othername.charAt(0);
    }

    getDamages() {
        this.damagesAsync = this.damageService.getDamages(this.personId, this.pageIndex, this.pageSize, this.filter);
    }

    onAddDamage() {
        const dialogRef = this.dialog.open(DamageDetailsComponent, {
            width: '350px',
            data: {
                editMode: false,
                damage: {
                    id: 0,
                    customerId: this.personId,
                    rating: 0,
                    comment: ''
                }
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getDamages();
            }
        });
    }

    onDamageSelect(damage: Damage) {
        // const dialogRef = this.dialog.open(DamageDetailsComponent, {
        //     width: '350px',
        //     data: {
        //         editMode: true,
        //         damage: JSON.parse(JSON.stringify(damage))
        //     }
        // });

        // dialogRef.afterClosed().subscribe(result => {
        //     if (result) {
        //         this.getDamages();
        //     }
        // });
    }

    onDamageDelete(Id: number) {
        // confirm delete
        this.alert.confirm({
            title: 'Are you sure',
            message: 'Do you want to delete this damage?',
            confirmText: 'DELETE',
            confirmColor: 'warn',
            callback: (result) => {
                if (result) {
                    this.deleteDamage(Id);
                }
            }
        });
    }

    deleteDamage(Id: number) {
        let response;
        this.loading = true;

        // delete damage
        this.damageService.deleteDamage(Id).subscribe(
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
                            this.deleteDamage(Id);
                        }
                    }
                });
            },
            () => {
                this.loading = false;
                this.notyService.alert(`The damage has been deleted successfully`);
                this.getDamages();
            }
        );
    }

}
