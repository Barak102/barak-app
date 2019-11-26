import {debounceTime, delay, map, skip, skipWhile, switchMap, tap} from 'rxjs/operators';
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fromEvent, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {FilterPipe} from '../pipes/filter.pipe';
import {ICollectionItem} from '../types/ICollectionItem';

@Component({
  selector: 'app-auto-suggest',
  templateUrl: './auto-suggest.component.html',
  styleUrls: ['./auto-suggest.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AutoSuggestComponent implements OnInit, AfterViewInit {

  public _searchText: string = '';

  set searchText(value: string) {
    this._searchText = value;
    this.searchTextChanged.next(this.searchText);
  }
  get searchText(): string {
   return this._searchText;
  }


  public searchTextChanged: Subject<string> = new Subject<string>();
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

  @ViewChild('searchTextInput', {static: true}) searchTextInput: ElementRef;
  public results: ICollectionItem[] = [];

  private debounceTiming: any = {
    typing: 200, // 500
    pipe: 2000, // 2000
    api: 2000, // 2000
  };

  constructor(private filterPipe: FilterPipe, private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  hasResults(): boolean {
    return this.results.length > 0;
  }

  filteredResults(itemsCollection: ICollectionItem[]): any[] {
    return this.filterPipe.transform(itemsCollection, this.pipeTextFiltering, false);
  }

  inputOnFocus(): void {
    this.openResults();
  }

  inputOnBlur(): void {
    this.inputIsOnFocus = false;
  }


  openResults(): void {
    this.inputIsOnFocus = true;
  }

  closeResults(): void {
    this.inputIsOnFocus = false;
  }


  ngAfterViewInit(): void {


    //
    //
    // this.searcsearchFilteredTextChanged.pipe(
    //
    // ).subscribe(r =>);


    const searchText$: any = of(this.searchText).pipe(
      debounceTime(this.debounceTiming.typing),
      skipWhile(r => !this.searchText),
      tap(c => console.log(`typing ${this.searchText}`))
    );
    const pipeSubscribe$: any = of('this.pipeTextFiltering').pipe(
      debounceTime(this.debounceTiming.pipe),
      tap(r => {
        console.log(this.pipeTextFiltering);})
    );

    const apiSubscribe$: any = of([
      {id: 1, name: 'Barak Josef'},
      {id: 2, name: 'Shiran Tal'},
      {id: 3, name: 'Ran bahar'},
      {id: 4, name: 'Kosta Masliansky'},
      {id: 5, name: 'Liora Twig'},
      {id: 6, name: 'Dubi Grinfeld'},
      {id: 7, name: 'Amir Sherer'},
      {id: 8, name: 'Shahar Horn'}]).pipe(
      tap(() => this.isLoadingResultsFromServer = true),
      delay(this.debounceTiming.api));

  //
  //   this.searchTextChanged.pipe(
  //     debounceTime(this.debounceTiming.typing),
  //         tap(() => {
  //           debugger;
  //       this.isLoadingResultsFromServer = false;
  //       this.lastPipeTextFiltering = this.pipeTextFiltering;
  //       this.pipeTextFiltering = this.searchText;
  //       console.log(`typing this!!!: ${this.searchText}`);
  //     }),
  //     switchMap(r => {
  //       return this.searchText !== this.lastSearchText ? of(this.pipeTextFiltering).pipe(
  //         debounceTime(this.debounceTiming.pipe),
  //         tap(c => {
  //           console.log(`Filtering this!!!: ${this.pipeTextFiltering}`);
  //         })
  //       ) : of(this.results);
  //     }),
  //     switchMap(r => {
  //       return this.lastPipeTextFiltering !== this.pipeTextFiltering ? apiSubscribe$ : of(this.results);
  //     }),
  //   ).subscribe((r: ICollectionItem[]) => {
  //         console.log('Get results from server');
  //         if (this.filteredResults(r).length === 0) {
  //           this.results = r;
  //         } else {
  //           this.results = this.filteredResults(this.results);
  //           for (let ind = 0; ind < r.length && this.results.length < 10; ind++) {
  //             const currentItem: ICollectionItem = r[ind];
  //             const includesInResults: number = this.results.findIndex(item => item.name === currentItem.name);
  //             if (includesInResults === -1) {
  //               console.log(`pushing ${currentItem}`);
  //               this.results.push(currentItem);
  //             }
  //           }
  //         }
  //         this.lastSearchText = this.searchText;
  //         this.isLoadingResultsFromServer = false;
  //         this.pipeTextFiltering = '';
  //       });




    fromEvent(this.searchTextInput.nativeElement, 'input').pipe(
      switchMap(r => searchText$),
      tap(r => {
        this.pipeTextFiltering = this.searchText;
        console.log(`filtering in pipe for the text: ${this.pipeTextFiltering}`);
      }),
      switchMap(s => pipeSubscribe$),
      debounceTime(this.debounceTiming.pipe),
      tap(() => {
        console.log('stop filter into pipe, goto server search');
      }),
      map(r => this.pipeTextFiltering),
      switchMap(s => apiSubscribe$),
      tap(r => {
        console.log(`${this.pipeTextFiltering} === ${this.searchText}`);
      })
    ).subscribe((r: ICollectionItem[]) => {
      console.log('Get results from server');
      if (this.filteredResults(r).length === 0) {
        this.results = r;
      } else {
        this.results = this.filteredResults(this.results);
        for (let ind = 0; ind < r.length && this.results.length < 10; ind++) {
          const currentItem: ICollectionItem = r[ind];
          const includesInResults: number = this.results.findIndex(item => item.name === currentItem.name);
          if (includesInResults === -1) {
            console.log(`pushing ${currentItem}`);
            this.results.push(currentItem);
          }
        }
      }
      this.lastSearchText = this.searchText;
      this.isLoadingResultsFromServer = false;
      this.pipeTextFiltering = '';
    });
   }

  itemSelectionHandler(selectedItem: ICollectionItem): void {
    this.searchText = selectedItem.name;
    this.pipeTextFiltering = selectedItem.name;
    this.closeResults();
  }

}
