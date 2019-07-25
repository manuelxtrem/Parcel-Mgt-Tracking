import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { WindowRef, DocumentRef } from '@agm/core/utils/browser-globals';

@Component({
  selector: 'app-initials-avatar',
  templateUrl: './initials-avatar.component.html',
  styleUrls: ['./initials-avatar.component.css']
})
export class InitialsAvatarComponent implements OnInit, OnChanges {
  @Input() initials = 'A';
  @Input() dimension = 45;
  @Input() circle = true;
  @Input() color: string;

  img: any;
  document: DocumentRef;
  window: WindowRef;

  constructor() {
    this.document = new DocumentRef();
    this.window = new WindowRef();
  }

  ngOnInit() {}

  ngOnChanges() {
    this.work();
  }

  work() {
    const colours = [
      '#1abc9c',
      '#2ecc71',
      '#3498db',
      '#9b59b6',
      '#34495e',
      '#16a085',
      '#27ae60',
      '#2980b9',
      '#8e44ad',
      '#2c3e50',
      '#f1c40f',
      '#e67e22',
      '#e74c3c',
      '#ecf0f1',
      '#95a5a6',
      '#f39c12',
      '#d35400',
      '#c0392b',
      '#bdc3c7',
      '#7f8c8d'
    ];

    let initials, charIndex, colourIndex, canvas, context, dataURI;

    initials = this.initials;

    // if (window.devicePixelRatio) {
    //     this.dimension = (this.dimension * this.window.getNativeWindow().devicePixelRatio);
    // }

    charIndex = (initials === '?' ? 72 : initials.charCodeAt(0)) - 64;
    colourIndex = charIndex % 20;
    canvas = this.document.getNativeDocument().createElement('canvas');
    canvas.width = this.dimension;
    canvas.height = this.dimension;
    context = canvas.getContext('2d');

    context.fillStyle = this.color ? this.color : colours[colourIndex - 1];
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = Math.round(canvas.width / 2.8) + 'px Arial';
    context.textAlign = 'center';
    context.fillStyle = '#FFF';
    context.fillText(initials, this.dimension / 2, this.dimension / 1.5);

    dataURI = canvas.toDataURL();
    canvas = null;

    this.img = dataURI;
  }
}
