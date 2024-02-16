import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

import { ParentService } from 'src/app/services/api/parent.service';
import { badRequestToasterConfig, successToasterConfig } from 'src/app/constats/toaster.configs';

@Component({
  selector: 'app-parent-edit',
  templateUrl: './parent-edit.component.html',
  styleUrls: ['./parent-edit.component.scss']
})
export class ParentEditComponent implements OnDestroy, OnInit {
  title: string = 'EDITAR PADRE/MADRE';
  parentFormConfig: any;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private parentService: ParentService,
    public dialogRef: MatDialogRef<ParentEditComponent>,
    private toastr: ToastrService
  ) {
    this.parentFormConfig = [
      { name: 'parent_id', label: 'ID', type: 'number', required: true, disabled: true, value: this.data.parent.parent_id },
      { name: 'name', label: 'Nombre', type: 'text', required: true, maxLength: 50, value: this.data.parent.name },
      { name: 'last_name', label: 'Apellido', type: 'text', required: true, maxLength: 50, value: this.data.parent.last_name },
      { name: 'phone_number', label: 'Teléfono', type: 'text', required: true, maxLength: 15, value: this.data.parent.phone_number },
      { name: 'gender', label: 'Género', type: 'select', required: true, options: [{value: 'M', viewValue: 'Masculino'}, {value: 'F', viewValue: 'Femenino'}], value: this.data.parent.gender },
      { name: 'dni', label: 'DNI', type: 'text', required: true, maxLength: 8, value: this.data.parent.dni }
    ];
  }

  ngOnInit(): void {
    // Carga inicial de datos si es necesario
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  onSubmit(formValue: any): void {
    this.parentService.updateParent(this.data.parent.parent_id, formValue)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.toastr.success('Padre/Madre actualizado con éxito', 'Éxito', successToasterConfig);
          this.dialogRef.close(true);
        },
        error => {
          this.toastr.error('Error al actualizar el padre/madre', 'Error', badRequestToasterConfig);
        }
      );
  }
}