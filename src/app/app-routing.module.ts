import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {HomeComponent} from './pages/home/home.component';
import {ArticlesComponent} from './pages/articles/articles.component';
import {ContactComponent} from './pages/contact/contact.component';
import {PortfolioComponent} from './pages/portfolio/portfolio.component';
import { ProgrammingGroupComponent } from './pages/programming-group/programming-group.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'portfolio', component: PortfolioComponent},
  {path: 'articles', component: ArticlesComponent,
  children: [
    {path: '**', component: NotFoundComponent}
    ]},
    {path: 'group', component: ProgrammingGroupComponent},
  {path: 'contact', component: ContactComponent},
  {path: '**', component: NotFoundComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
