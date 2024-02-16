import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

import { StudentService } from 'src/app/services/api/student.service';
import { badRequestToasterConfig, successToasterConfig } from 'src/app/constats/toaster.configs';
import { ShiftService } from 'src/app/services/api/shift.service';
import { ParentService } from 'src/app/services/api/parent.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnDestroy, OnInit {
  title: string = 'EDITAR ESTUDIANTE';
  parents = [];
  shifts = [];
  studentFormConfig: any;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentService: StudentService,
    private shiftService: ShiftService,
    private parentService: ParentService,
    public dialogRef: MatDialogRef<StudentEditComponent>,
    private toastr: ToastrService
  ) {
    
    this.studentFormConfig = [
      { name: 'student_id', label: 'ID', type: 'number', required: true, disabled: true, value: this.data.student.student_id },
      { name: 'name', label: 'Nombre', type: 'text', required: true, maxLength: 50, value: this.data.student.name },
      { name: 'last_name', label: 'Apellido', type: 'text', required: true, maxLength: 50, value: this.data.student.last_name },
      { name: 'gender', label: 'Género', type: 'select', required: true, options: [{value: 'M', viewValue: 'Masculino'}, {value: 'F', viewValue: 'Femenino'}], value: this.data.student.gender },
      { name: 'dni', label: 'DNI', type: 'text', required: true, maxLength: 8, value: this.data.student.dni },
      { name: 'phone_number', label: 'Teléfono', type: 'text', required: true, maxLength: 15, value: this.data.student.phone_number },
      { name: 'parent', label: 'Padre/Madre', type: 'select', required: true, options: this.parents, value: this.data.student.parent }, // Asegúrate de cargar las opciones de padres
      { name: 'shift', label: 'Turno', type: 'select', required: true, options: this.shifts, value: this.data.student.shift } // Asegúrate de cargar las opciones de turnos
    ];
  }
  ngOnInit(): void {
    this.loadShifts();
    this.loadParents();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  loadShifts(){
    this.shiftService.getShifts()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (data) => {
        this.shifts = data.map(shift => ({ value: shift.shift_id, viewValue: shift.name }));
        const productField = this.studentFormConfig.find(field => field.name === 'shift');
        if (productField) {
          productField.options = this.shifts;
        }
      },
      (error) => {
        this.toastr.error('Error al cargar los productos');
      }
    );
  }

  loadParents(){
    this.parentService.getParents()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (data) => {
        this.parents = data.map(parent => ({ value: parent.parent_id, viewValue: parent.name }));
        const parentField = this.studentFormConfig.find(field => field.name === 'parent');
        if (parentField) {
          parentField.options = this.parents;
        }
      },
      (error) => {
        this.toastr.error('Error al cargar los productos');
      }
    );
  }

  onSubmit(formValue: any): void {
    this.studentService.updateStudent(this.data.student.student_id, formValue)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.toastr.success('Estudiante actualizado con éxito', 'Éxito', successToasterConfig);
          this.dialogRef.close(true);
        },
        error => {
          this.toastr.error('Error al actualizar el estudiante', 'Error', badRequestToasterConfig);
        }
      );
  }
}