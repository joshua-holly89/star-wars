import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleOverviewComponent } from './people-overview.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { NameFilterPipe } from 'src/app/pipes/name-filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlatformService } from 'src/app/services/platform/platform.service';

describe('PeopleOverviewComponent', () => {
  let component: PeopleOverviewComponent;
  let fixture: ComponentFixture<PeopleOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleOverviewComponent, NameFilterPipe],
      imports: [
        HttpClientModule,
        MatListModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatIconModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        PlatformService
      ]
    });
    fixture = TestBed.createComponent(PeopleOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
