import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotyService } from '../../../../shared/service/noty.service';
import { AlertService } from '../../../../shared/service/alert.service';
import { DamageService } from '../../../../shared/service/damage.service';
import { Damage } from '../../../../shared/model';
import { PersonService } from '../../../../shared/service/person.service';
import { MapPickerService } from '../../../../shared/service/map-picker.service';
import { RouteService } from '../../../../shared/service/route.service';

@Component({
  selector: 'app-damage-details',
  templateUrl: './damage-details.component.html',
  styleUrls: ['./damage-details.component.css']
})
export class DamageDetailsComponent implements OnInit {
  typeAheadFilter: string;
  details: Damage = new Damage();
  loading: boolean;
  editMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<DamageDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private damageService: DamageService,
    private notyService: NotyService,
    private alertService: AlertService
  ) {
    this.details = data.damage;
    this.editMode = data.editMode;
  }

  ngOnInit() {
    // this.dialogRef.disableClose = true;
    this.dialogRef.updateSize('350px');
    this.dialogRef.beforeClose().subscribe(() => {
      this.notyService.dismissAll();
    });
  }

  onSave() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.notyService.dismissAll();
    let result;

    if (this.editMode) {
      // we're saving edited chages
      this.damageService.editDamage(this.details).subscribe(
        res => (result = res),
        error => {
          this.loading = false;
          this.alertService.confirm({
            title: 'An error occurred',
            message: 'Could not save changes. Do you want to retry?',
            confirmText: 'RETRY',
            confirmColor: 'warn',
            callback: ans => {
              if (ans) {
                this.onSave();
              }
            }
          });
        },
        () => {
          this.loading = false;
          this.notyService.alert('Changes have been saved successfully.');
          this.dialogRef.close(true);
        }
      );
    } else {
      // we're adding new details
      this.damageService.addDamage(this.details).subscribe(
        res => (result = res),
        error => {
          this.loading = false;
          this.alertService.confirm({
            title: 'An error occurred',
            message: 'Could not save changes. Do you want to retry?',
            confirmText: 'RETRY',
            confirmColor: 'warn',
            callback: ans => {
              if (ans) {
                this.onSave();
              }
            }
          });
        },
        () => {
          this.loading = false;
          this.alertService.alert({
            title: 'Success',
            message: 'The report has been submitted successfully.'
          });
          this.dialogRef.close(true);
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
