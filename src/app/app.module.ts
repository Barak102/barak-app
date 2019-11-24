import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MainComponent} from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SubMainComponent } from './main/sub-main/sub-main.component';
import { OtherSubMainComponent } from './main/other-sub-main/other-sub-main.component';
import {FilterPipe} from './filter.pipe';
import {FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ArticlesComponent } from './articles/articles.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NotFoundComponent,
    SubMainComponent,
    FilterPipe,
    OtherSubMainComponent,
    HomeComponent,
    PortfolioComponent,
    ArticlesComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
