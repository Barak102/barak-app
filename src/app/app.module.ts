import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {FormsModule, FormControl} from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BarakSharedModule } from './barak-shared/barak-shared.module';
import { FilterPipe } from './barak-shared/pipes/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarContentComponent } from './side-bar-content/side-bar-content.component';
import { ProgrammingGroupComponent } from './pages/programming-group/programming-group.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    PortfolioComponent,
    ArticlesComponent,
    ContactComponent,
    SideBarContentComponent,
    ProgrammingGroupComponent,
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
