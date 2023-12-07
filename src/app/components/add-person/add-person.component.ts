import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Person } from 'src/app/model/person';
import { PeopleService } from 'src/app/services/people/people.service';


@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPersonComponent implements OnInit {
  public personForm: FormGroup<PersonForm> | undefined;
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject( MatDialogRef<AddPersonComponent>);
  private peopleService = inject(PeopleService);

  ngOnInit(): void {
    this.personForm = this.formBuilder.nonNullable.group({
      name: ['', Validators.required],
      height: ['', Validators.required],
      mass: ['', Validators.required],
      birth_year: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.personForm?.valid) {
      const newPerson: Person = Object.assign({}, {
        name: this.personForm.value.name?? '',
        height: this.personForm.value.height || '',
        mass: this.personForm.value.mass || '',
        birth_year: this.personForm.value.birth_year || '',
        gender: this.personForm.value.gender || ''
      });
      this.peopleService.addPersonAtStart(newPerson);
      this.close();
    }
  }

  close(): void{
    this.dialogRef.close();
  }
}

interface PersonForm {
  name: FormControl<string>;
  height: FormControl<string>;
  mass: FormControl<string>;
  birth_year: FormControl<string>;
  gender: FormControl<string>;
}
