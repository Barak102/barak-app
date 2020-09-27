import { debounceTime, delay, map, skip, skipWhile, switchMap, tap } from 'rxjs/operators';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, HostListener, Input, OnChanges, SimpleChanges, AfterContentInit, DoCheck, OnDestroy } from '@angular/core';
import { fromEvent, of, Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FilterPipe } from '../pipes/filter.pipe';
import { ICollectionItem } from '../types/ICollectionItem';

// tslint:disable-next-line: no-conflicting-lifecycle
@Component({
  selector: 'app-auto-suggest',
  templateUrl: './auto-suggest.component.html',
  styleUrls: ['./auto-suggest.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AutoSuggestComponent implements OnInit, AfterViewInit, OnChanges, DoCheck, AfterContentInit, OnDestroy {
  @Input() fieldName: string;
  _searchText: string = '';


  @Input() placeHolder: string;

  set searchText(value: string) {
    this._searchText = value;
    this.searchTextChanged$.next(this.searchText);
  }
  get searchText(): string {
    return this._searchText;
  }


  public searchTextChanged$: Subject<string> = new Subject<string>();
  public pipeSubscribe$: Subject<string> = new Subject<string>();
  public searchFilteredTextChanged: Subject<string> = new Subject<string>();
  public lastPipeTextFiltering: string = '';
  public pipeTextFiltering: string = '';
  public isLoadingResultsFromServer: boolean = false;
  public inputIsOnFocus: boolean = false;
  public lastSearchText: string;
  public _selectedValue: ICollectionItem;

  set selectedValue(value: ICollectionItem) {
    this._selectedValue = value;
    this.searchText = this._selectedValue.name;
  }

  @ViewChild('searchTextInput', { static: true }) searchTextInput: ElementRef;
  public results: ICollectionItem[] = [];

  private debounceTiming: any = {
    typing: 150,
    pipe: 2500,
    api: 1000,
  };

  constructor(private filterPipe: FilterPipe, private http: HttpClient) {
    //onsole.log('Constructor');
  }



  ngOnChanges(changes: SimpleChanges): void {
    //console.log('ng on changes');
  }

  ngDoCheck(): void {
    //console.log('ng do chgeck');
  }

  ngOnInit(): void {
    //console.log('ng on init');
  }

  ngAfterContentInit(): void {
    //console.log('ng after content init');
  }

  ngAfterViewInit(): void {
    //console.log('ng after view init');
    const searchText$: any = of(this.searchText).pipe(
      debounceTime(this.debounceTiming.typing),
      skipWhile(r => !this.searchText),
      tap(c => console.log(`typing ${this.searchText}`))
    );


    this.searchTextChanged$.pipe(
      debounceTime(this.debounceTiming.typing)
    ).subscribe(r => {
      this.isLoadingResultsFromServer = false;
      //console.log(`Typing text: ${this.searchText}`);
      if (this.results.length > 0) {
        this.pipeSubscribe$.next(r);
      } else {
        this.getResultsFromServer().subscribe(results => {
          this.resolveResults(results);
        });
      }
    });

    this.pipeSubscribe$.pipe(
      tap(val => {
        this.pipeTextFiltering = val;
        //console.log(`filtering text: ${this.pipeTextFiltering}`);
      }),
      debounceTime(this.debounceTiming.pipe),
    )
      .subscribe(val => {
        this.pipeTextFiltering = val;
        if (this.pipeTextFiltering && !this.isLoadingResultsFromServer) {
          //console.log('go to server search after filtering');
          this.getResultsFromServer().subscribe(results => {
            this.resolveResults(results);
          });
        }
      });
  }

  hasResults(): boolean {
    return this.results.length > 0;
  }

  filteredResults(itemsCollection: ICollectionItem[], caseSensitive: boolean = false): any[] {
    return this.filterPipe.transform(itemsCollection, this.pipeTextFiltering, caseSensitive);
  }

  inputOnFocus(): void {
    this.openResults();
  }

  inputOnBlur(): void {
    setTimeout(() => this.inputIsOnFocus = false, 250);
  }


  openResults(): void {
    this.inputIsOnFocus = true;
  }

  closeResults(): void {
    this.inputIsOnFocus = false;
  }




  getResultsFromServer(): Observable<any> {
    return of([
      { id: 1, name: 'Barak Josef' },
      { id: 2, name: 'Shiran Tal' },
      { id: 3, name: 'Ran bahar' },
      { id: 4, name: 'Kosta Masliansky' },
      { id: 5, name: 'Liora Twig' },
      { id: 6, name: 'Dubi Grinfeld' },
      { id: 7, name: 'Amir Sherer' },
      { id: 8, name: 'Shahar Horn' },
      { id: 9, name: 'Stas Grenin' },
      { id: 10, name: 'Bruna Mathias Sinowetz' },
      { id: 11, name: 'Kobi Barokas' },
      { id: 12, name: 'Amir Perets' },
      { id: 13, name: 'Tomer Rubinstein' },
      { id: 14, name: 'Michael Dalal' }]).pipe(
        tap(() => this.isLoadingResultsFromServer = true),
        delay(this.debounceTiming.api),
        map((r: ICollectionItem[]) => this.filteredResults(r, false)));
  }

  resolveResults(results: ICollectionItem[]): void {
    //console.log('Get results from server');
    if (this.filteredResults(results).length === 0) {
      this.results = results;
    } else {
      this.results = this.filteredResults(this.results, true);
      for (let ind = 0; ind < results.length && this.results.length < 10; ind++) {
        const currentItem: ICollectionItem = results[ind];
        const includesInResults: number = this.results.findIndex(item => item.name === currentItem.name);
        if (includesInResults === -1) {
          //console.log(`pushing ${currentItem}`);
          this.results.push(currentItem);
        }
      }
    }
    this.lastSearchText = this.searchText;
    this.isLoadingResultsFromServer = false;
    this.pipeTextFiltering = '';
  }

  itemSelectionHandler(selectedItem: ICollectionItem): void {
    this.searchText = selectedItem.name;
    this.pipeTextFiltering = selectedItem.name;
    this.closeResults();
  }

  @HostListener('window:keydown', ['$event'])
  keyUpHandler($event: any): void {
    switch ($event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
        if (this.results.length > 0) {
          $event.preventDefault();
        }
        break;
    }
  }

  ngOnDestroy(): void {
    //console.log('autosuggest destroyed :(');
  }
}
