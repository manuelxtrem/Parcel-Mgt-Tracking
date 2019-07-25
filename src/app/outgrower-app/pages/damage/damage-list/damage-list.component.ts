import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../shared/service/alert.service';
import { DamageService } from '../../../../shared/service/damage.service';
import { NotyService } from '../../../../shared/service/noty.service';
import { Result, Damage, ResponsiveButton } from '../../../../shared/model';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'app-damage-list',
    templateUrl: './damage-list.component.html',
    styleUrls: ['./damage-list.component.css']
})
export class DamageListComponent implements OnInit {
    loading: boolean;
    pageIndex = 0;
    pageSize = 10;
    filter: string;
    selectedGroupId: number;
    selectedGroupName: string;
    damagesAsync: Observable<Result<Damage>>;
    actionButtons: ResponsiveButton[];

    damageType: string;

    @ViewChild('filterInput') filterInput: ElementRef;

    constructor(private router: Router,
        private aRoute: ActivatedRoute,
        public damageService: DamageService,
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
                    this.onDamageDelete(data);
                }
            }
        ];

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

    getInitials(damage: Damage): string {
        return damage.customer.surname.charAt(0) + damage.customer.othername.charAt(0);
    }

    getDamages() {
        console.log('pager-pageIndex', this.pageIndex);
        console.log('pager-pageSize', this.pageSize);
        this.damagesAsync = this.damageService.getDamages(0, this.pageIndex, this.pageSize, this.filter);
    }

    onPage(event) {
        console.log('onPage-event', event);
        this.pageIndex = +event.pageIndex;
        this.pageSize = +event.pageSize;
        this.getDamages();
    }

    onDamageSelect(Id: number) {
        // this.router.navigateByUrl(`details/${Id}`);
        // this.router.navigate(['details', Id], { relativeTo: this.aRoute });
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

    selectGroup(Id: number) {
        console.log('selecting', 'group ' + Id);
        this.selectedGroupId = Id;
        this.selectedGroupName = `Group ${Id}`;
    }

}
