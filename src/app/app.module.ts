import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MainComponent} from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SubMainComponent } from './main/sub-main/sub-main.component';
import { OtherSubMainComponent } from './main/other-sub-main/other-sub-main.component';
import {FormsModule, FormControl} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ArticlesComponent } from './articles/articles.component';
import { ContactComponent } from './contact/contact.component';
import { BarakSharedModule } from './barak-shared/barak-shared.module';
import { FilterPipe } from './barak-shared/pipes/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarContentComponent } from './side-bar-content/side-bar-content.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NotFoundComponent,
    SubMainComponent,
    OtherSubMainComponent,
    HomeComponent,
    PortfolioComponent,
    ArticlesComponent,
    ContactComponent,
    SideBarContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BarakSharedModule,
    BrowserAnimationsModule,
  ],
  providers: [FilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
