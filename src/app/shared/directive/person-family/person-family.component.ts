import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Person } from '../../model';
import { AlertService } from '../../service/alert.service';
import { NotyService } from '../../service/noty.service';
import { PersonService } from '../../service/person.service';
import { MatDialog } from '@angular/material';
import { PersonFamilyEditComponent } from './person-family-edit/person-family-edit.component';

@Component({
    selector: 'app-person-family',
    templateUrl: './person-family.component.html',
    styleUrls: ['./person-family.component.css']
})
export class PersonFamilyComponent implements OnInit, OnChanges {

    spouses: Person[];
    children: Person[];
    loading: boolean;
    editMode: boolean;
    personSpouse = PersonService.PERSON_SPOUSE;
    personChild = PersonService.PERSON_CHILD;

    @Input() personID: number;
    @Input() load: boolean;

    constructor(
        private dialog: MatDialog,
        private personService: PersonService,
        private notyService: NotyService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.spouses = [];
        this.children = [];
    }

    ngOnChanges() {
        if (this.load) {
            this.getSpouses();
        }
    }

    getSpouses() {
        this.loading = true;

        this.personService.getSpouses(this.personID).subscribe(
            details => this.spouses = details,
            (error) => {
                this.loading = false;
                this.alertService.confirm({
                    title: 'An error occurred',
                    message: 'Could not get the spouses of this person. Do you want to retry?',
                    confirmText: 'RETRY',
                    callback: (result) => {
                        if (result) {
                            this.getSpouses();
                        }
                    }
                });
            },
            () => {
                this.getChildren();
            }
        );
    }

    getChildren() {
        this.personService.getChildren(this.personID).subscribe(
            details => this.children = details,
            (error) => {
                this.loading = false;
                this.alertService.confirm({
                    title: 'An error occurred',
                    message: 'Could not get the children of this person. Do you want to retry?',
                    confirmText: 'RETRY',
                    callback: (result) => {
                        if (result) {
                            this.getSpouses();
                        }
                    }
                });
            },
            () => {
                this.loading = false;
            }
        );
    }

    addEntry(type: string) {
        const dialogRef = this.dialog.open(PersonFamilyEditComponent);
        dialogRef.componentInstance.editMode = false;
        dialogRef.componentInstance.personId = 0;
        dialogRef.componentInstance.personType = type;
        dialogRef.componentInstance.parentID = this.personID;

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.refresh();
            }
        });
    }

    onItemSelect(index, item: Person) {
        console.log('editing changes');

        const dialogRef = this.dialog.open(PersonFamilyEditComponent);
        dialogRef.componentInstance.editMode = true;
        dialogRef.componentInstance.parentID = this.personID;
        dialogRef.componentInstance.personId = item.id;

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.refresh();
            }
        });
    }

    refresh() {
        this.getSpouses();
    }
}
