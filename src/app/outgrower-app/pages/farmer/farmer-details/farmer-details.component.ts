import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { PersonService } from '../../../../shared/service/person.service';
import { PersonDetailComponent } from '../../../../shared/directive/person-detail/person-detail.component';
import { NotyService } from '../../../../shared/service/noty.service';
import { Person } from '../../../../shared/model';
import { AlertService } from '../../../../shared/service/alert.service';

@Component({
  selector: 'app-farmer-details',
  templateUrl: './farmer-details.component.html',
  styleUrls: ['./farmer-details.component.css']
})
export class FarmerDetailsComponent implements OnInit {
  personId = 0;
  loadLogin: boolean;
  fixed: boolean;
  personDetails: Person;
  personDetailEdit: boolean;
  personType: string;
  loading: boolean;

  @ViewChild('personDetail') personDetail: PersonDetailComponent;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private aRoute: ActivatedRoute,
    private noty: NotyService,
    private alertService: AlertService,
    private personService: PersonService
  ) {}

  ngOnInit() {
    this.aRoute.params.subscribe(params => {
      this.personId = +params['id'];
      this.personType = params['personType'];
      console.log(params);
    });
  }

  onOpenedLogin() {
    // this.loadLogin = true;
  }

  onWindowScroll() {
    const num = this.doc.body.scrollTop;
    console.log('scroll', num);
    if (num > 50) {
      this.fixed = true;
    } else if (this.fixed && num < 5) {
      this.fixed = false;
    }
  }

  onImageUpload(image: string) {
    // console.log('image received', image);
    this.loading = true;
    this.personService.editPersonPicture(this.personId, image).subscribe(
      result => {},
      error => {
        this.loading = false;
        this.alertService.confirm({
          title: 'An error occurred',
          message: 'Could not upload this picture! Do you want to try again.',
          confirmText: 'RETRY',
          callback: result => {
            if (result) {
              this.onImageUpload(image);
            }
          }
        });
      },
      () => {
        this.loading = false;
        this.noty.alert('The picture has been saved!');
      }
    );
  }

  onSaveClick() {
    this.personDetail.onSave();
  }

  gotPerson(person: Person) {
    this.personDetails = person;
    this.loadLogin = true;
  }
}
