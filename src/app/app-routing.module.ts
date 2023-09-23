import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { PeopleOverviewComponent } from './components/people-overview/people-overview.component';
import { MODE } from './config';

const routes: Routes = [
  { path: 'person/:index', component: PersonDetailComponent }
];
if(MODE === "new-page"){
  routes.push({ path: '', component: PeopleOverviewComponent });
}


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
