import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Person } from 'src/app/services/Person';
import { PeopleService } from 'src/app/services/people.service';
import { AddPersonComponent } from '../add-person/add-person.component';

@Component({
  selector: 'app-people-overview',
  templateUrl: './people-overview.component.html',
  styleUrls: ['./people-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PeopleOverviewComponent implements OnInit {
  public people$: Observable<Person[]>;
  public isLoading$: Observable<boolean>;
  public filterValue: string;
  private peopleService = inject(PeopleService);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.people$ = this.peopleService.people;
    this.isLoading$ = this.peopleService.loadingStatus;
  }

  public deletePerson(index: number){
    this.peopleService.delete(index);
  }

  public openDialog(){
    const dialogRef = this.dialog.open(AddPersonComponent, {
      // Specify the desired width and height of the dialog
      width: '300px',
      height: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
