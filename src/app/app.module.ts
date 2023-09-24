import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeopleOverviewComponent } from './components/people-overview/people-overview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';

import { NameFilterPipe } from './pipes/name-filter.pipe';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { PeopleService } from './services/people/people.service';
import { PlatformService } from './services/platform/platform.service';

@NgModule({
  declarations: [AppComponent, PeopleOverviewComponent, PersonDetailComponent, NameFilterPipe, AddPersonComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [PeopleService],
      multi: true,
    },
    PlatformService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function initializeApp(peopleService: PeopleService) {
  return () => {
    peopleService.fetchAllPeople()};
}
