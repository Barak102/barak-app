import { debounce, switchMap, delay, debounceTime, tap, map, skipWhile, takeWhile, retryWhen } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { fromEvent, timer, of, ObservableInput, empty, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FilterPipe } from '../pipes/filter.pipe';

@Component({
  selector: 'app-auto-suggest',
  templateUrl: './auto-suggest.component.html',
  styleUrls: ['./auto-suggest.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AutoSuggestComponent implements OnInit, AfterViewInit {
  public searchText: string = '';
  public pipeTextFiltering: string = '';
  public isLoadingResultsFromServer: boolean = false;
  public inputIsOnFocus: boolean = false;
  @ViewChild('searchTextInput', {static: true}) searchTextInput: ElementRef;

  public results: any[] = [];

  private debounceTiming: any = {
    typing: 100, // 100
    pipe: 2000, // 3000
    api: 2000, // 2000
  };

  constructor(private filterPipe: FilterPipe, private http: HttpClient) { }

  ngOnInit(): void {
  }

  hasResults(): boolean {
    return this.results.length > 0;
  }

  filteredResults(itemsCollection: any[]): any[] {
    return this.filterPipe.transform(itemsCollection, this.pipeTextFiltering , false);
  }

  inputOnFocus(): void {
    this.inputIsOnFocus = true;
  }
  inputOnBlur(): void {
    this.inputIsOnFocus = false;
  }


  ngAfterViewInit(): void {
  const apiSubscribe$: any = of(['Barak Josef' , 'Shiran Tal' , 'Ran bahar', 'Kosta Masliansky',
  'Liora Twig', 'Dubi Grinfeld', 'Amir Sherer', 'Shahar Horn']).pipe(
    tap(() => this.isLoadingResultsFromServer = true),
    delay(this.debounceTiming.api));

  const pipeSubscribe$: any = of(this.pipeTextFiltering);
  fromEvent(this.searchTextInput.nativeElement, 'input').pipe(
      debounceTime(this.debounceTiming.typing),
      tap(r => {
        this.pipeTextFiltering = this.searchText;
        console.log(`filtering in pipe for the text: ${this.pipeTextFiltering}`)
        ; }),
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
    ).subscribe((r: any[]) => {
      console.log('Get results from server');
      if(this.filteredResults(r).length === 0) {
        this.results = r;
      } else {
        this.results = this.filteredResults(this.results);
        for (let ind = 0; ind < r.length && this.results.length < 10; ind++) {
          const currentItem: any = r[ind];
          const includesInResults: number = this.results.findIndex(item => item === currentItem);
          if (includesInResults === -1) {
            console.log(`pushing ${currentItem}`);
            this.results.push(currentItem);
          }
        }
      }
      this.isLoadingResultsFromServer = false;
      this.pipeTextFiltering = '';
    });
  }

}
