import { Directive, Input, OnChanges, TemplateRef, EmbeddedViewRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appTemplateWrapper]'
})
export class TemplateWrapperDirective implements OnChanges {
    @Input() item: any;

    @Input() index: number;

    @Input('appTemplateWrapper') templateRef: TemplateRef<any>;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnChanges() {
        if(this.templateRef) {
            this.view = this.viewContainer.createEmbeddedView(this.templateRef, {
                '\$implicit': this.item,
                'index': this.index
            });
        }
    }

    ngOnDestroy() {
        if(this.view)
            this.view.destroy();
    }

}
