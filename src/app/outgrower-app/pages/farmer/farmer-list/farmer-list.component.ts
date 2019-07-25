import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../shared/service/alert.service';
import { PersonService } from '../../../../shared/service/person.service';
import { NotyService } from '../../../../shared/service/noty.service';
import { Result, Person, ResponsiveButton } from '../../../../shared/model';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-farmer-list',
  templateUrl: './farmer-list.component.html',
  styleUrls: ['./farmer-list.component.css']
})
export class FarmerListComponent implements OnInit {
  loading: boolean;
  pageIndex = 0;
  pageSize = 10;
  filter: string;
  selectedGroupId: number;
  selectedGroupName: string;
  personsAsync: Observable<Result<Person>>;
  actionButtons: ResponsiveButton[];
  driverParcelsButton = {
    title: 'Parcels',
    icon: 'dns',
    callback: (data: number) => {
      this.router.navigateByUrl(`/manage/parcel/driver/${data}`);
    }
  };
  driverMapButton = {
    title: 'Location',
    icon: 'location_on',
    callback: (data: number) => {
      // TODO
      console.log('STUB!!');
    }
  };

  personType: string;

  @ViewChild('filterInput') filterInput: ElementRef;

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    public personService: PersonService,
    public notyService: NotyService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.actionButtons = [
      {
        title: 'Details',
        icon: 'person',
        callback: data => {
          this.onFarmerSelect(data);
        }
      },
      this.driverParcelsButton,
      {
        title: 'Delete',
        icon: 'delete_forever',
        color: 'warning',
        callback: (data: number) => {
          this.onFarmerDelete(data);
        }
      }
    ];

    this.aRoute.params.subscribe(params => {
      this.personType = params['personType'];

      if (this.personType === PersonService.PERSON_DRIVER) {
        if (this.actionButtons.length === 2) {
          this.actionButtons.splice(1, 0, this.driverParcelsButton);
        }
      } else {
        if (this.actionButtons.length > 2) {
          this.actionButtons.splice(1, 1);
        }
      }

      this.getPeople();
    });

    Observable.fromEvent(this.filterInput.nativeElement, 'keyup')
      .debounceTime(800)
      .distinctUntilChanged()
      .subscribe(() => {
        this.filter = this.filterInput.nativeElement.value;
        this.getPeople();
      });
  }

  getPersonType() {
    return (
      this.personType.charAt(0).toUpperCase() + this.personType.substr(1) + 's'
    );
  }

  getInitials(person: Person): string {
    return person.surname.charAt(0) + person.othername.charAt(0);
  }

  getPeople() {
    this.personsAsync = this.personService.getPersons(
      this.personType,
      this.pageIndex,
      this.pageSize,
      this.filter
    );
  }

  addPerson() {
    this.router.navigate(['details', 'add'], { relativeTo: this.aRoute });
  }

  onFarmerSelect(Id: number) {
    // this.router.navigateByUrl(`details/${Id}`);
    this.router.navigate(['details', Id], { relativeTo: this.aRoute });
  }

  onPage(event) {
    console.log('onPage-event', event);
    this.pageIndex = +event.pageIndex;
    this.pageSize = +event.pageSize;
    this.getPeople();
  }

  onFarmerDelete(Id: number) {
    // confirm delete
    this.alert.confirm({
      title: 'Are you sure',
      message: 'Do you want to delete this member?',
      confirmText: 'DELETE',
      confirmColor: 'warn',
      callback: result => {
        if (result) {
          this.deleteFarmer(Id);
        }
      }
    });
  }

  deleteFarmer(Id: number) {
    let response;
    this.loading = true;

    // delete member
    this.personService.deletePerson(Id).subscribe(
      data => (response = data),
      error => {
        console.log(error);
        this.loading = false;
        // confirm retry delete
        this.alert.confirm({
          title: 'An error occurred',
          message: 'Try to delete again?',
          callback: status => {
            if (status) {
              this.deleteFarmer(Id);
            }
          }
        });
      },
      () => {
        this.loading = false;
        this.notyService.alert(`The person has been deleted successfully`);
        this.getPeople();
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
//     dataChange: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);
//     get data(): Person[] { return this.dataChange.value; }
//     personsObservale: Observable<Person[]>;
//     totalItems: number;
//     pageIndex = 0;
//     pageSize = 25;

//     constructor(public personService: PersonService) {
//         // get data
//         this.retreivePersons()
//             // this.personService.getPersons('Farmer', 0, 10)
//             .subscribe((result) => {
//                 this.dataChange.next(result);
//             });
//     }

//     retreivePersons(): Observable<Person[]> {
//         this.personsObservale = this.personService.getFarmers(this.pageIndex, this.pageSize)
//             .map((res: Result<Person>) => {
//                 console.log('resuts gotten');
//                 this.totalItems = res.total;
//                 return res.data;
//             });

//         this.personsObservale
//             .subscribe((result) => {
//                 this.dataChange.next(result);
//             });

//         return this.personsObservale;
//     }
// }
