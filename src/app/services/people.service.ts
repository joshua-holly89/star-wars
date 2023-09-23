import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  throwError,
} from 'rxjs';
import { Person } from './Person';
import { SwapiResponse } from './SwapiResponse';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private _baseUrl = 'https://swapi.dev/api/people/';
  private _cachedPeople$: Person[];
  private _peopleSubject$: BehaviorSubject<Person[]> = new BehaviorSubject([]);
  private _loadingStatusSubject$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  private _deletedIndexSubject$: Subject<number> = new Subject();
  private http = inject(HttpClient);

  get people(): Observable<Person[]> {
    return this._peopleSubject$.asObservable();
  }

  get loadingStatus(): Observable<boolean> {
    return this._loadingStatusSubject$.asObservable();
  }

  get deletedIndex(): Observable<number> {
    return this._deletedIndexSubject$.asObservable();
  }

  public addPersonAtStart(newPerson: Person): void {
    this._cachedPeople$.unshift(newPerson);
  }

  public fetchAllPeople() {
    this.init();
    this.fetchPeopleRecursivelyFrom(this._baseUrl);
  }

  public getPerson(index: number): Person {
    return this._cachedPeople$[index];
  }

  public delete(index: number): void {
    this._cachedPeople$.splice(index, 1);
    this._peopleSubject$.next(this._cachedPeople$);
    this._deletedIndexSubject$.next(index);
  }

  private init(): void {
    this._cachedPeople$ = [];
    this._loadingStatusSubject$.next(true);
    this._peopleSubject$.next(this._cachedPeople$);
  }

  private fetchPeopleRecursivelyFrom(urlOfCurrentPage: string): void {
    this.http.get<SwapiResponse>(urlOfCurrentPage).pipe(
      catchError((error) => {
        const errorMessage = 'Something bad happened while fetching the people; please try again later.';
        this._loadingStatusSubject$.next(false);
        console.error(errorMessage);
        alert(errorMessage);
        return throwError(() => new Error(errorMessage));
      })).subscribe((response) => {
      this.addPeopleAtEnd(response);
      if (response.next != null) {
        this.fetchPeopleRecursivelyFrom(response.next);
      } else {
        this._loadingStatusSubject$.next(false);
      }
    });
  }

  private addPeopleAtEnd(response: SwapiResponse): void {
    this._cachedPeople$.push(...response.results);
    this._peopleSubject$.next(this._cachedPeople$);
  }
}
