import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDetailComponent } from './person-detail.component';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

describe('PersonDetailComponent', () => {
  let component: PersonDetailComponent;
  let fixture: ComponentFixture<PersonDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonDetailComponent],
      imports: [
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatDialogModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ index: 1 }),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(PersonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
