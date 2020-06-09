import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutoSuggestComponent} from './auto-suggest/auto-suggest.component';
import {FormsModule} from '@angular/forms';
import {InputResultsComponent} from './input-results/input-results.component';
import {HttpClientModule} from '@angular/common/http';
import {FilterPipe} from './pipes/filter.pipe';
import {MatProgressSpinnerModule, MatSpinner} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryCarouselComponent } from './gallery-carousel/gallery-carousel.component';
@NgModule({
  declarations: [
    AutoSuggestComponent,
    InputResultsComponent,
    GalleryCarouselComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  exports: [AutoSuggestComponent, FilterPipe, GalleryCarouselComponent]
})
export class BarakSharedModule {
}
