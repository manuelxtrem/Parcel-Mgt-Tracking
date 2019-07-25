import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotyService } from '../../service/noty.service';

@Component({
  selector: 'app-printer',
  templateUrl: './printer.component.html',
  styleUrls: ['./printer.component.css']
})
export class PrinterComponent implements OnInit {
  @ViewChild('printDocument') private printDocument: ElementRef;

  constructor(private noty: NotyService) {}

  ngOnInit() {}

  print() {
    const newWin = window.open('', '', 'width=800,height=800');

    if (newWin.document) {
      newWin.document.write(this.printDocument.nativeElement.outerHTML);
      newWin.document.close();
      newWin.focus();
      newWin.print();
      newWin.close();
    } else {
      this.noty.alert('An unknown error occurred. Kindlt try that again.');
    }
  }
}
