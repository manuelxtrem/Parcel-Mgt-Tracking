import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Result, TableColumn, TableInfo } from '../../model';

@Component({
    selector: 'app-datatable',
    templateUrl: 'datatable.component.html',
    styleUrls: ['datatable.component.css'],
})
export class DataTableComponent implements OnInit, OnChanges {
    @Input() nameOfItems = 'entries';
    @Input() columns: TableColumn[] = [];
    @Input() loading = true;
    @Input() results: Result<any>;
    @Input() perPage = 20;
    @Input() filter: string;
    @Input() pageSizes = [10, 20, 50, 100, 150, 200, 250, 500];
    @Input() info: string;
    @Output() infoChange: EventEmitter<TableInfo> = new EventEmitter<TableInfo>();
    @Output() onDblClick: EventEmitter<any> = new EventEmitter<any>();

    // selection = [];
    // selectAllCheck: boolean;
    paginationInfo: string;
    selected: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        if (!this.results) {
            this.results = {
                total: 0,
                page: 0,
                data: []
            };
        }

        // not loading when we receive data
        if (this.results.page > 0) {
            this.loading = false;
        }
    }

    getTemplate(colIndex: number, dataIndex: number) {
        const data = this.results.data[dataIndex][this.columns[colIndex].data];

        if (!this.columns[colIndex].template) {
            return data;
        } else {
            return this.columns[colIndex].template.replace('[data]', data);
        }
    }

    startLoading() {
        this.loading = true;
    }

    stopLoading() {
        this.loading = false;
        this.onCheck();
    }

    onPageChange() {
        // this.results.page = pageEvent.pageIndex + 1;
        // this.perPage = pageEvent.pageSize;
    }

    dblClick(rowData) {
        this.onDblClick.emit(rowData);
    }

    getCheckedItems(): number[] {
        return this.results.data
            // remember to add a checked property to your results model
            .filter(item => item.checked)
            .map(item => item[this.columns[0].data]);
    }

    selectAllItems(status) {
        for (let i = 0; i < this.results.data.length; i++) {
            this.results.data[i].checked = status.checked;
        }
        this.onCheck();
    }

    onCheck() {
        const items = this.getCheckedItems();

        if (items.length > 0) {
            this.selected = true;
            this.infoChange.emit({
                selection: items,
                info: `${items.length} ${this.nameOfItems} selected`
            });
        } else {
            this.infoChange.emit({
                selection: items,
                info: this.paginationInfo
            });
            this.selected = false;
        }
    }

    onItemChecked(status, colIndex, dataIndex) {
        const data = this.getTemplate(colIndex, dataIndex);
        this.results.data[dataIndex].checked = status.checked;

        this.onCheck();
    }

}
