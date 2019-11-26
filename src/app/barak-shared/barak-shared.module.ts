import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutoSuggestComponent} from './auto-suggest/auto-suggest.component';
import {FormsModule} from '@angular/forms';
import {InputResultsComponent} from './input-results/input-results.component';
import {HttpClientModule} from '@angular/common/http';
import {FilterPipe} from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AutoSuggestComponent,
    InputResultsComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
  ],
  exports: [AutoSuggestComponent, FilterPipe]
})
export class BarakSharedModule {
}
