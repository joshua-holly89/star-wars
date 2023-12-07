import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Person } from 'src/app/model/person';
import { AddPersonComponent } from '../add-person/add-person.component';
import { PeopleService } from 'src/app/services/people/people.service';
import { PlatformService } from 'src/app/services/platform/platform.service';
import { Platform } from 'src/app/services/platform/Platform';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people-overview',
  templateUrl: './people-overview.component.html',
  styleUrls: ['./people-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleOverviewComponent implements OnInit {
  public people$: Observable<Person[]> | undefined;
  public isLoading$: Observable<boolean> | undefined;
  public filterValue: string | undefined;
  private platform: Platform | undefined ;
  private router = inject(Router);
  private platformService = inject(PlatformService);
  private peopleService = inject(PeopleService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.people$ = this.peopleService.people;
    this.isLoading$ = this.peopleService.loadingStatus;
    this.platformService.platform.subscribe((platform) => this.platform = platform);
  }

  public deletePerson(id: number): void{
    this.peopleService.deletePerson(id);
  }

  public openDialog(): void{
    this.dialog.open(AddPersonComponent, {
      width: '300px',
      height: '600px',
    });
  }

  public personTrackBy(_index: number, person: Person): number | undefined {
    return person.id;
  }

  public openDetailView(person: Person){
    this.router.navigate([{ outlets: { [this.platform === 'desktop' ? 'right' : 'main']: ['person', person.id] } }]);
  }

}
