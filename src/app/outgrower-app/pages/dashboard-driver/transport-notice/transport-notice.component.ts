import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AlertService } from '../../../../shared/service/alert.service';

@Component({
  selector: 'app-transport-notice',
  templateUrl: './transport-notice.component.html',
  styleUrls: ['./transport-notice.component.css']
})
export class TransportNoticeComponent implements OnInit {
  constructor(
    public alertService: AlertService,
    public dialogRef: MatDialogRef<TransportNoticeComponent>
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit() {}

  endTracking() {
    this.alertService.confirm({
      title: 'Alert',
      // tslint:disable-next-line:max-line-length
      message:
        'Do you want to confirm arrival at your destination? Remember that this action will affect all parcels currently in transport.',
      callback: result => {
        this.dialogRef.close(result);
      }
    });
  }
}
