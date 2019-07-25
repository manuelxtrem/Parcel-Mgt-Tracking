import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { PersonService } from '../../../../shared/service/person.service';
import { PersonDetailComponent } from '../../../../shared/directive/person-detail/person-detail.component';
import { NotyService } from '../../../../shared/service/noty.service';
import { Person } from '../../../../shared/model';
import { AlertService } from '../../../../shared/service/alert.service';

@Component({
  selector: 'app-farmer-add',
  templateUrl: './farmer-add.component.html',
  styleUrls: ['./farmer-add.component.css']
})
export class FarmerAddComponent implements OnInit {
  personId = 0;
  loadLogin: boolean;
  fixed: boolean;
  personDetails: Person;
  personDetailEdit: boolean;
  personType = PersonService.PERSON_DRIVER;
  loading: boolean;

  @ViewChild('personDetail') personDetail: PersonDetailComponent;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private router: Router,
    private aRoute: ActivatedRoute,
    private noty: NotyService,
    private alertService: AlertService,
    private personService: PersonService
  ) {}

  ngOnInit() {
    this.aRoute.params.subscribe(params => {
      this.personType = params['personType'];
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

  onSaveClick() {
    this.personDetail.onSave();
  }

  gotPerson(person: Person) {
    this.router.navigate([this.personType, 'details', person.id], {
      relativeTo: this.aRoute.parent
    });
  }
}
