// tslint:disable-next-line:max-line-length
import { Component, OnInit, Input, Output, OnChanges, AfterContentInit, SimpleChanges, EventEmitter, ContentChildren, TemplateRef, QueryList, ElementRef, IterableDiffers, IterableDiffer } from '@angular/core';
import { Result } from '../../model';
import { Observable } from 'rxjs/Observable';
import { MainTemplateDirective } from './Directives/main-template.directive';
import { DataViewLoadDirective } from './Directives/data-view-load.directive';
import { PageEvent } from '@angular/material';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']

})
export class ListComponent implements OnInit, OnChanges, AfterContentInit {
    differ: IterableDiffer<{}>;
    @ContentChildren(MainTemplateDirective) templates: QueryList<any>;
    @ContentChildren(DataViewLoadDirective) loadTemplates: QueryList<any>;
    public itemTemplate: TemplateRef<any>;
    @Input() ResultAsync: Observable<Result<any>>;
    @Input() disableEmptyWarning = false;
    defaultEmptyText = 'No Entries';
    @Input() EmptyWarningText = 'No Entries';
    @Output() loaded = new EventEmitter<any[]>();
    @Output() pageChange = new EventEmitter<PageEvent>();
    @Input() data = [];
    @Output() dataChange = new EventEmitter<any[]>();
    @Input() showPagination = true;
    dataLength = 0;
    pagerIndex = 1;
    pagerTotal = 0;
    pagerSize = 10;
    isLoading = true;
    pageSizeOptions = [10, 25, 50, 100];

    constructor(public el: ElementRef, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;

                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.data && !changes.ResultAsync) {
            this.isLoading = false;
            return;
        }

        this.isLoading = true;
        this.EmptyWarningText = 'Loading...';
        let tempData = [];


        if (this.ResultAsync) {
            let result: Result<any>;

            this.ResultAsync.subscribe(r => {
                result = <Result<any>>r;

                if (result) {
                    tempData = result.data;
                }
            }, (e) => {
                this.isLoading = false;
                this.EmptyWarningText = 'An Error Occurred';
                this.data = [];
                this.dataLength = 0;
            }, () => {
                this.isLoading = false;
                this.EmptyWarningText = this.defaultEmptyText;
                if (tempData) {
                    this.data = tempData;

                    this.dataLength = tempData.length;
                    this.pagerTotal = result.total;
                } else {
                    this.EmptyWarningText = 'No Entries';
                    this.data = [];
                    this.dataLength = 0;
                }
                this.dataChange.emit(this.data);
            });
        } else {
            this.EmptyWarningText = 'An Error Occurred';
        }
    }

    ngOnInit() {
    }

    onPageChange(event) {
        this.pageChange.emit(event);
    }
}
