import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {ICollectionItem} from '../types/ICollectionItem';
import {FilterPipe} from '../pipes/filter.pipe';

@Component({
  selector: 'app-input-results',
  templateUrl: './input-results.component.html',
  styleUrls: ['./input-results.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputResultsComponent implements OnInit {

  @Input() public displayLoading: boolean = false;
  @Input() public changeSelectedIndex: Subject<number>;

  private _itemCollection: ICollectionItem[];
  public mouseEntered: boolean = false;


  get itemCollection(): ICollectionItem[] {
    return this._itemCollection;
  }

  @Input('itemCollection')
  set itemCollection(value: ICollectionItem[]) {
    this._itemCollection = value;
    if (this.selectedIndex > this._itemCollection.length) {
      this.selectedIndex = -1;
    }
  }

  private _textFilter: string;

  get textFilter(): string {
    return this._textFilter;
  }

  @Input('textFilter')
  set textFilter(value: string) {
    this._textFilter = value;
    if (this.selectedIndex > this.itemCollectionFiltered().length - 1) {
      this.selectedIndex = -1;
    }
  }

  @Output() itemSelectedHandler = new EventEmitter();


  selectValue(itemIndex: any): void {
    const selectedItem: any = this.itemCollectionFiltered()[itemIndex];
    this.itemSelectedHandler.emit(selectedItem);
  }

  public selectedIndex: number = -1;


  constructor(private filterPipe: FilterPipe) {
  }

  ngOnInit(): void {

    if (this.changeSelectedIndex) {
      this.changeSelectedIndex.subscribe(n => this.changeIndex(n));
    }
  }


  itemCollectionFiltered(): any {
    return this.filterPipe.transform(this._itemCollection, this.textFilter, false);
  }

  changeIndex(ind: number): void {
    if (ind < this.itemCollectionFiltered().length && ind > -1 && !this.mouseEntered) {
      this.selectedIndex = ind;
      console.log(`Selected index: ${this.selectedIndex}`);
    }
  }


  @HostListener('window:keyup', ['$event'])
  keyUpHandler($event: any): void {
    let currentIndex: number = this.selectedIndex;
    switch ($event.key) {
      case 'ArrowUp':
        this.changeIndex(--currentIndex);
        break;
      case 'ArrowDown':
        this.changeIndex(++currentIndex);
        break;
      case 'Enter':
        this.selectValue(this.selectedIndex);
        break;
    }
  }

  mouseEnterHandler(ind: number) {
    this.changeIndex(ind);
    this.mouseEntered = true;
  }

  mouseLeaveHandler() {
    this.mouseEntered = false;
  }
}
