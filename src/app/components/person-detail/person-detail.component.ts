import { ChangeDetectionStrategy, ChangeDetectorRef, OnInit, inject } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/model/person';
import { PeopleService } from 'src/app/services/people/people.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonDetailComponent implements OnInit {
  public idCouldNotBeParsedError: boolean = false;
  public personCouldNotBeLoadedError: boolean = false;
  public person: Person |undefined;
  private route = inject(ActivatedRoute);
  private peopleService = inject(PeopleService);
  private id: number | undefined;
  private router = inject(Router);
  private changeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getIdOfPersonAndFetch(params["id"]);
    })
    this.navigateToRootOnDisplayedPersonDeleted();
  }

  private navigateToRootOnDisplayedPersonDeleted(): void {
    this.peopleService.deletedId.subscribe(id => {
      if (id === this.id) {
        this.router.navigate(["/"]);
      }
    });
  }

  private getIdOfPersonAndFetch(idAsString: string): void {
    this.tryToParseAndSetId(idAsString);
    if (!this.idCouldNotBeParsedError) {
      this.loadPerson();
    }
  }

  private loadPerson(): void {
    if(this.id == null) {
      throw new Error( "person id is null");
    }
    this.person = this.peopleService.getPersonById(this.id);
    if (this.person == null) {
      this.personCouldNotBeLoadedError = true;
    } else {
      this.personCouldNotBeLoadedError = false;
    }
    this.changeDetectorRef.detectChanges();
  }

  private tryToParseAndSetId(idAsString: string): void {
    try {
      this.id = parseInt(idAsString, 10);
      if (isNaN(this.id)) {
        this.idCouldNotBeParsedError = true;
      }
    } catch {
      this.idCouldNotBeParsedError = true;
    }
    this.changeDetectorRef.detectChanges();
  }
}
