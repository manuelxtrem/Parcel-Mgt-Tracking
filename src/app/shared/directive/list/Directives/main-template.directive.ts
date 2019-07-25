import { Directive, TemplateRef, Input, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appItem]'
})
export class MainTemplateDirective {
  @Input() type: string;
  @Input('appItem') name: string;

  // @Input('sc-template') templateRef: TemplateRef<any>;

  // view: EmbeddedViewRef<any>;

  constructor(public template: TemplateRef<any>) {
    // this.viewContainerRef.createEmbeddedView(this.templateRef);
  }

  getType(): string {
    if (this.type) {
      console.log('Defining a pTemplate with type property is deprecated use pTemplate="type" instead.');
      return this.type;
    }
    else {
      return this.name;
    }
  }

}
