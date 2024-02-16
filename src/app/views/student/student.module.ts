import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentPageComponent } from './student-page/student-page.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { GenericTableModule} from './../../containers/generic-table/generic-table.module'

import { StudentListComponent } from './student-list/student-list.component';
import { StudentEditComponent } from './student-edit/student-edit.component';

import { MatCardModule } from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { GenericFormModule } from 'src/app/containers/generic-form/generic-form.module';

@NgModule({
  declarations: [
    StudentPageComponent,
    StudentFormComponent,
    StudentListComponent,
    StudentEditComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    GenericTableModule,
    MatDialogModule,
    GenericFormModule
  ]
})
export class StudentModule { }
