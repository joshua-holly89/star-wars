import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonComponent } from './add-person.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddPersonComponent', () => {
  let component: AddPersonComponent;
  let fixture: ComponentFixture<AddPersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPersonComponent],
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
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers:[
        {provide : MatDialogRef, useValue : {}}
      ]
    });
    fixture = TestBed.createComponent(AddPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
