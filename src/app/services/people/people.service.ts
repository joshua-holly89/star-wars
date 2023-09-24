import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  throwError,
} from 'rxjs';
import { Person } from '../../model/person';
import { SwapiResponse } from '../../model/swapi-response';
import { peopleMock } from './people-mock';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private _baseUrl = 'https://swapi.dev/api/people/';
  private _peopleSubject$: BehaviorSubject<Person[]> = new BehaviorSubject([]);
  private _loadingStatusSubject$: BehaviorSubject<boolean> =
    new BehaviorSubject(false);
  private _deletedIdSubject$: Subject<number> = new Subject();
  private http = inject(HttpClient);
  private currentId = 0;

  get people(): Observable<Person[]> {
    return this._peopleSubject$.asObservable();
  }

  get loadingStatus(): Observable<boolean> {
    return this._loadingStatusSubject$.asObservable();
  }

  get deletedId(): Observable<number> {
    return this._deletedIdSubject$.asObservable();
  }

    public fetchAllPeople(): void {
      this._loadingStatusSubject$.next(true);
      this.fetchPeopleRecursivelyFrom(this._baseUrl);
    }

  public addPersonAtStart(newPerson: Person): void {
    this.addIdToPerson(newPerson);
    this.dispatchPeople([newPerson, ...this._peopleSubject$.getValue()]);
  }

  public getPersonById(id: number): Person {
    return this._peopleSubject$.getValue().find((person) => person.id === id);
  }

  public deletePerson(id: number): void {
    const tempPeople = [...this._peopleSubject$.getValue()];
    tempPeople.splice(this.getIndexOfPersonById(id), 1);
    this.dispatchPeople(tempPeople);
    this._deletedIdSubject$.next(id);
  }

  private getIndexOfPersonById(id: number): number {
    return this._peopleSubject$
      .getValue()
      .findIndex((person) => person.id === id);
  }

  private fetchPeopleRecursivelyFrom(urlOfCurrentPage: string): void {
    this.http
      .get<SwapiResponse>(urlOfCurrentPage)
      .pipe(
        catchError((error) => {
          const errorMessage =
            'Something bad happened while fetching the people; please try again later.';
          this._loadingStatusSubject$.next(false);
          alert(errorMessage);
          return throwError(() => new Error(errorMessage));
        })
      )
      .subscribe((response) => {
        this.addIdsToPersons(response);
        this.addPeopleAtEnd(response);
        if (response.next != null) {
          this.fetchPeopleRecursivelyFrom(response.next);
        } else {
          this._loadingStatusSubject$.next(false);
        }
      });
  }

  private addIdsToPersons(response: SwapiResponse): void {
    for (const person of response.results) {
      this.addIdToPerson(person);
    }
  }

  private addPeopleAtEnd(response: SwapiResponse): void {
    this.dispatchPeople([
      ...this._peopleSubject$.getValue(),
      ...response.results,
    ]);
  }

  private dispatchPeople(newPeople: Person[]): void {
    this._peopleSubject$.next(newPeople);
  }

  private addIdToPerson(person: Person): void {
    person.id = this.currentId++;
  }
}
