import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { ShiftService } from 'src/app/services/api/shift.service';

@Component({
  selector: 'app-shift-delete',
  templateUrl: './shift-delete.component.html',
  styleUrls: ['./shift-delete.component.scss']
})
export class ShiftDeleteComponent implements OnInit, OnDestroy {
  title = 'TURNO';
  id: number;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ShiftDeleteComponent>,
    private shiftService: ShiftService,
    private toastr: ToastrService
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.id = this.data.shift_id;
  }

  onConfirm(id: number): void {
    this.shiftService.deleteShift(this.data.shift_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.toastr.success('Turno eliminado exitosamente');
        },
        error: (error) => {
          this.toastr.error('Error al eliminar el turno');
        }
      });
  }
}