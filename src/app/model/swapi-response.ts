import { Person } from './person';

export interface SwapiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}
