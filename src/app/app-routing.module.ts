import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { PeopleOverviewComponent } from './components/people-overview/people-overview.component';

const routes: Routes = [
  { path: 'person/:id', component: PersonDetailComponent, outlet: 'main'},
  { path: 'person/:id', component: PersonDetailComponent, outlet: 'right'},
  { path: '', component: PeopleOverviewComponent, outlet: 'main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
