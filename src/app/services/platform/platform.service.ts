import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Platform } from './Platform';

@Injectable()
export class PlatformService {
  public platform$: Observable<Platform>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.platform$ = this.breakpointObserver.observe('(max-width: 768px)')
      .pipe(
        map((result) => result.matches ? 'mobile' : 'desktop')
      );
  }

  get platform(): Observable<Platform> {
    return this.platform$;
  }
}
