import { Component, OnDestroy, OnInit } from '@angular/core';
import { IShift } from 'src/app/models/shift.model'; // Asegúrate de tener este modelo definido
import { ShiftService } from 'src/app/services/api/shift.service'; // Asegúrate de tener este servicio definido
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ShiftAddComponent } from '../shift-add/shift-add.component'; // Asegúrate de tener este componente definido
import { ShiftDeleteComponent } from '../shift-delete/shift-delete.component'; // Asegúrate de tener este componente definido
import { ShiftEditComponent } from '../shift-edit/shift-edit.component'; // Asegúrate de tener este componente definido
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { ShiftEventService } from 'src/app/services/ShiftEventService';

@Component({
  selector: 'app-shift-list',
  templateUrl: './shift-list.component.html',
  styleUrls: ['./shift-list.component.scss']
})
export class ShiftListComponent implements OnDestroy, OnInit {
  displayedColumns: string[] = ['name','start_time','end_time', 'entry_start', 'entry_end','early_until','late_until','leave_start','leave_end']; // Agrega 'actions' si quieres columnas para editar/borrar
  columnNames: string[] = ['Nombre','Turno Inicio', 'Turno Fin', 'Inicio Entrada', 'Fin Entrada','Temprano Hasta','Tarde Hasta','Inicio Salida', 'Fin Salida']; // Agrega 'Acciones' para los botones de editar/borrar
  dataSource: MatTableDataSource<IShift>;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private shiftService: ShiftService,
    private dialog: MatDialog,
    private shiftEventService: ShiftEventService
  ) {
    this.dataSource = new MatTableDataSource<IShift>([]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.updateTableData();
    this.shiftEventService.shiftAdded$.subscribe({
      next: (shift) => {
        this.updateTableData(); // Actualiza la tabla cuando se agrega un nuevo turno
      }
    });
  }

  updateTableData(): void {
    this.shiftService.getShifts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.dataSource.data = res;
      });
  }

  openEditModal(shift: IShift): void {
    const dialogRef = this.dialog.open(ShiftEditComponent, {
      data: { shift }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  openDeleteModal(element: any): void {
    const dialogRef = this.dialog.open(ShiftDeleteComponent, {
      data: { shift_id: element.shift_id }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(ShiftAddComponent);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }
}