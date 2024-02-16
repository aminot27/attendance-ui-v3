import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ShiftService } from 'src/app/services/api/shift.service';

@Component({
  selector: 'app-shift-edit',
  templateUrl: './shift-edit.component.html',
  styleUrls: ['./shift-edit.component.scss']
})
export class ShiftEditComponent implements OnDestroy {
  title: string = 'EDITAR TURNO';
  shiftFormConfig: any;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ShiftEditComponent>,
    private shiftService: ShiftService,
    private toastr: ToastrService
  ) {
    this.shiftFormConfig = [
      { name: 'name', label: 'Nombre urno', type: 'text', required: true, maxLength: 100, value: this.data.shift.name },
      { name: 'start_time', label: 'Turno inicio', type: 'time', required: true, value: this.data.shift.start_time },
      { name: 'end_time', label: 'Turno fin', type: 'time', required: true, value: this.data.shift.end_time },
      { name: 'entry_start', label: 'Inicio Hora Entrada', type: 'time', required: false, value: this.data.shift.entry_start },
      { name: 'entry_end', label: 'Fin Hora Entrada', type: 'time', required: false, value: this.data.shift.entry_end },
      { name: 'early_until', label: 'Temprano Hasta', type: 'time', required: false, value: this.data.shift.early_until },
      { name: 'late_until', label: 'Tarde Hasta', type: 'time', required: false, value: this.data.shift.late_until },
      { name: 'leave_start', label: 'Inicio Salida', type: 'time', required: false, value: this.data.shift.leave_start },
      { name: 'leave_end', label: 'Fin Salida', type: 'time', required: false, value: this.data.shift.leave_end }
    ];
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  onSubmit(event: any): void {
    // Aquí deberías implementar la lógica para actualizar el turno usando un servicio, similar a `brandService.updateBrand`
    this.shiftService.updateShift(this.data.shift.shift_id, event)
    .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.toastr.success('Turno actualizado con éxito');
          this.dialogRef.close(true);
        },
        error => {
          this.toastr.error('Error al actualizar el turno');
        }
      );
  }
}