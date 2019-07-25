import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { TypeAhead } from '../../model';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.css']
})
export class TypeaheadComponent implements OnInit {
  @Input() loading: boolean;
  @Input() hasImage: boolean;
  @Input() placeholder: string;
  @Input() value: string;
  @Input() itemList: TypeAhead[];
  @Output() filter: EventEmitter<string> = new EventEmitter();

  @Output()
  onTypedAhead: EventEmitter<TypeAhead> = new EventEmitter<TypeAhead>();

  @ViewChild('filterInput') filterInput: ElementRef;

  constructor() {}

  ngOnInit() {
    Observable.fromEvent(this.filterInput.nativeElement, 'keyup')
      .debounceTime(800)
      .distinctUntilChanged()
      .subscribe(() => {
        this.filter.emit(this.filterInput.nativeElement.value);
      });
  }

  displayFn(item?: TypeAhead): string | undefined {
    return item ? item.value : undefined;
  }

  clear() {
    this.value = '';
    this.onTypedAhead.emit({
      id: 0,
      value: ''
    });
  }

  onSelected(event: MatAutocompleteSelectedEvent) {
    this.onTypedAhead.emit(event.option.value);
  }
}
