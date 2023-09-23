import { AfterViewInit, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Person } from 'src/app/services/Person';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PersonDetailComponent implements OnInit {

  public indexCouldNotBeParsedError: boolean = false;
  public personCouldNotBeLoadedError: boolean = false;
  public person: Person;
  private route = inject(ActivatedRoute);
  private peopleService = inject(PeopleService);
  private index: number;
  private router = inject(Router);

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getIndexOfPersonAndFetch();
      }
    });
    this.getIndexOfPersonAndFetch();
    this.peopleService.deletedIndex.subscribe(index =>{
      if(index === this.index){
        this.router.navigate(["/"])
      } else if(index < this.index){
        this.router.navigate(["/person/" + (this.index - 1)]);
      }
    })
  }

  private getIndexOfPersonAndFetch() {
    this.tryToParseAndSetIndex();
    if (!this.indexCouldNotBeParsedError) {
      this.loadPerson();
    }
  }

  private loadPerson() {
    this.person = this.peopleService.getPerson(this.index);
    if (this.person == null) {
      this.personCouldNotBeLoadedError = true;
    }
  }

  private tryToParseAndSetIndex() {
    try {
      this.index = parseInt(this.route.snapshot.paramMap.get('index'), 10);
      if (isNaN(this.index)) {
        this.indexCouldNotBeParsedError = true;
      }
    } catch {
      this.indexCouldNotBeParsedError = true;
    }
  }
}
