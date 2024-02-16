import { Component, OnInit } from '@angular/core';
import { IAttendanceRecord } from '../../../models/attendance_record.model'; // Asegúrate de que la ruta sea correcta
import { AttendanceService } from '../../../services/api/attendance.service'; // Asegúrate de que la ruta sea correcta
import { GlobalKeyListenerService } from 'src/app/services/global-key-listener.service';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/services/api/student.service';import { IStudent } from 'src/app/models/student.model';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-attendance-table',
  templateUrl: './attendance-table.component.html',
  styleUrls: ['./attendance-table.component.scss']
})
export class AttendanceTableComponent implements OnInit {
  attendanceRecords: IAttendanceRecord[] = [];
  displayedColumns: string[] = ['attendance_id', 'studentName', 'entry_time', 'status', 'exit_time', 'shift'];
  scannedDni: string = '';
  private students: IStudent[] = [];
  dataSource: MatTableDataSource<IAttendanceRecord> = new MatTableDataSource<IAttendanceRecord>([]);

  constructor(private attendanceService: AttendanceService,
    private globalKeyListenerService: GlobalKeyListenerService,
    private toastr: ToastrService,
    private studentService:StudentService,
    ) {
    
    }

  ngOnInit(): void {
    this.loadStudents();
    this.loadAttendanceRecords();
    this.listenToDniScans();
    this.globalKeyListenerService.dniRegistrationSuccess.subscribe(() => {
      this.loadAttendanceRecords();
    });
  
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(
      (students) => {
        this.students = students;
      },
      (error) => {
        console.error('Error al cargar los estudiantes', error);
      }
    );
  }

  
       
  loadAttendanceRecords(): void {
    this.attendanceService.getAttendanceRecords().subscribe(
      (records) => {
        this.attendanceRecords = records;
        const recordsWithStudentName = records.map(attendance => ({
          ...attendance,
          studentName: this.getStudentName(attendance.student)
        }));
        this.dataSource.data = recordsWithStudentName;
      },
      (error) => {
        console.error('Error al cargar los registros de asistencia', error);
      }
    );
  }

  getStudentName(student_id: number): string {
    const student = this.students.find(s => s.student_id === student_id);
    return student ? student.name: 'N/A';
  }

  listenToDniScans(): void {
    
  }

}