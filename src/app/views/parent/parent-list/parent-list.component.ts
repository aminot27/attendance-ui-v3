import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { ParentService } from 'src/app/services/api/parent.service'; // Asegúrate de tener este servicio
import { IParent } from 'src/app/models/parent.model'; // Asegúrate de tener este modelo
// import { ParentAddComponent } from '../parent-add/parent-add.component'; // Asegúrate de crear este componente
import { ParentEditComponent } from '../parent-edit/parent-edit.component'; // Asegúrate de crear este componente
// import { ParentDeleteComponent } from '../parent-delete/parent-delete.component'; // Asegúrate de crear este componente
import { CrudEventsService } from 'src/app/services/crud-events.service'; // Si usas un servicio para manejar eventos CRUD
import { ParentUpdateService } from 'src/app/services/parent-update.service'; // Asegúrate de tener este servicio

@Component({
  selector: 'app-parent-list',
  templateUrl: './parent-list.component.html',
  styleUrls: ['./parent-list.component.scss']
})
export class ParentListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['parent_id', 'name', 'last_name','gender','dni', 'phone_number',];
  columnNames: string[] = ['ID', 'Nombre', 'Apellido','Genero','DNI', 'Teléfono'];
  dataSource: MatTableDataSource<IParent>;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private parentService: ParentService,
    private dialog: MatDialog,
    private crudEventsService: CrudEventsService,
    private parentUpdateService: ParentUpdateService
  ) {
    this.dataSource = new MatTableDataSource<IParent>([]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.updateTableData();
    this.crudEventsService.itemAdded
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.updateTableData();
      });
    this.parentUpdateService.parentAdded$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.updateTableData(); // Actualiza la tabla cuando se añade un padre
      });
  }

  updateTableData(): void {
    this.parentService.getParents()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.dataSource.data = res;
      });
  }

  openEditModal(parent: IParent): void {
    const dialogRef = this.dialog.open(ParentEditComponent, {
      data: { parent }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  onDelete(parent: IParent): void {
    // Implementa la lógica de eliminación aquí
  }

  
}