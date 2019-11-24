import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {SubMainComponent} from './main/sub-main/sub-main.component';
import {OtherSubMainComponent} from './main/other-sub-main/other-sub-main.component';
import {HomeComponent} from './home/home.component';
import {ArticlesComponent} from './articles/articles.component';
import {ContactComponent} from './contact/contact.component';
import {PortfolioComponent} from './portfolio/portfolio.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'portfolio', component: PortfolioComponent},
  {path: 'articles', component: ArticlesComponent,
  children: [
    {path: '', component: SubMainComponent},
    {path: 'sub', component: SubMainComponent},
    {path: 'other', component: OtherSubMainComponent},
    {path: '**', component: NotFoundComponent}
    ]},
  {path: 'contact', component: ContactComponent},
  {path: '**', component: NotFoundComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
