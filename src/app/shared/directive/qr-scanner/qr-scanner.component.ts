import {
  Component,
  OnInit,
  Inject,
  Input,
  ViewChild,
  VERSION
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ɵa } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css']
})
export class QrScannerComponent implements OnInit {
  ngVersion = VERSION.full;

  @ViewChild('scanner') scanner: ɵa;

  hasCameras = false;
  hasPermission: boolean;
  // qrResultString: string;

  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;
  selectedDeviceId: any;
  selectedDeviceIndex: number;

  constructor(
    public dialogRef: MatDialogRef<QrScannerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log('this.scanner', this.scanner);
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;

      console.log('Devices: ', devices);
      this.availableDevices = devices;

      // selects the devices's back camera by default
      // for (const device of devices) {
      //   if (/back|rear|environment/gi.test(device.label)) {
      //     this.scanner.changeDevice(device);
      //     this.selectedDevice = device;
      //     this.selectedDeviceId = device.deviceId;
      //     break;
      //   }
      // }

      // select the only one by default
      if (!this.selectedDevice && devices.length > 0) {
        this.selectDevice(devices.length - 1);
      }
    });

    this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
      console.error(
        'An error has occurred when trying to enumerate your video-stream-enabled devices.'
      );
    });

    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
    });
  }

  selectDevice(index: number) {
    this.scanner.changeDevice(this.availableDevices[index]);
    this.selectedDevice = this.availableDevices[index];
    this.selectedDeviceId = this.availableDevices[index].deviceId;
    this.selectedDeviceIndex = index;
  }

  switchCamera() {
    let nextIndex: number;

    if (this.selectedDeviceIndex + 1 > this.availableDevices.length - 1) {
      nextIndex = 0;
    } else {
      nextIndex = this.selectedDeviceIndex + 1;
    }

    this.selectDevice(this.selectedDeviceIndex + 1);
  }

  handleQrCodeResult(resultString: string) {
    console.log('Result: ', resultString);
    // this.qrResultString = resultString;
    this.dialogRef.close(resultString);
  }

  onDeviceSelectChange(selectedValue: string) {
    console.log('Selection changed: ', selectedValue);
    this.selectedDevice = this.scanner.getDeviceById(selectedValue);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
