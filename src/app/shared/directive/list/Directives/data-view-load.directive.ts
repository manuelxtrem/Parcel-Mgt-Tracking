import { Directive, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[enableLoadedEvent]'
})
export class DataViewLoadDirective implements OnChanges, AfterViewInit, AfterContentInit {
  ngAfterContentInit(): void {
  }

  ngAfterViewInit(): void {
    if (!this.viewLoaded) {
      this.viewLoaded = true;
      this.loaded.emit(true);
    }
  }


  viewLoaded: boolean = false;
  @Input('enableLoadedEvent') enable: boolean;
  @Input('length') length: number;
  // @Input('length') length: number;
  @Input('index') index: number;
  @Output('loaded') loaded = new EventEmitter<boolean>();

  constructor() {
    // this.viewContainerRef.createEmbeddedView(this.templateRef);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.enable) {
      let l = this.length;
      let i = this.index;
      if (i > -1 && l === i + 1) {
        if (this.viewLoaded) {
          this.loaded.emit(true);
        }
      }
    }
  }
}
