import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Person } from 'src/app/services/Person';
import { PeopleService } from 'src/app/services/people.service';


@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPersonComponent implements OnInit {
  personForm: FormGroup;
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject( MatDialogRef<AddPersonComponent>);
  private peopleService = inject(PeopleService);

  ngOnInit(): void {
    this.personForm = this.formBuilder.group({
      name: ['', Validators.required],
      height: ['', Validators.required],
      mass: ['', Validators.required],
      birth_year: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.personForm.valid) {
      const newPerson: Person = this.personForm.value;
      this.peopleService.addPersonAtStart(newPerson);
      this.close();
    }
  }

  close(): void{
    this.dialogRef.close();
  }
}
