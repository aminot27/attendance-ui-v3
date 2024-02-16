import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { StudentService } from 'src/app/services/api/student.service';
import { IStudent } from 'src/app/models/student.model';
// import { StudentAddComponent } from '../student-add/student-add.component'; // Asegúrate de crear este componente
import { StudentEditComponent } from '../student-edit/student-edit.component'; // Asegúrate de crear este componente
// import { StudentDeleteComponent } from '../student-delete/student-delete.component'; // Asegúrate de crear este componente
import { CrudEventsService } from 'src/app/services/crud-events.service'; // Si usas un servicio para manejar eventos CRUD
import { StudentUpdateService } from 'src/app/services/student-update.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {
  displayedColumns: string[] = ['student_id', 'name', 'last_name', 'gender', 'dni', 'phone_number','parent', 'shift'];
  columnNames: string[] = ['ID', 'Nombre', 'Apellido', 'Género', 'DNI', 'Teléfono','parent', 'shift'];
  dataSource: MatTableDataSource<IStudent>;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog,
    private crudEventsService: CrudEventsService,
    private studentUpdateService: StudentUpdateService
  ) {
    this.dataSource = new MatTableDataSource<IStudent>([]);
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

    this.studentUpdateService.studentAdded$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
      this.updateTableData(); // Actualiza la tabla cuando se añade un estudiante
    });
  }

  updateTableData(): void {
    this.studentService.getStudents()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.dataSource.data = res;
      });
  }

  openEditModal(student: IStudent): void {
    const dialogRef = this.dialog.open(StudentEditComponent, {
      data: { student }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  onDelete(student: IStudent): void {
    
  }

  onAdd(): void {
    
  }
}
