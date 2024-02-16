import { Inject, Injectable, Optional } from '@angular/core';
import { API_BASE_URL, BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IAttendanceRecord } from '../../models/attendance_record.model'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService extends BaseService {
  private ATTENDANCE_FILTER_API = "/api/warehouse/attendance_records/filter/"; // Endpoint para obtener registros de asistencia
  private ATTENDANCE_SET_API = "/api/warehouse/attendance_record/"; // Endpoint para operaciones CRUD en un registro de asistencia

  constructor(private _http: HttpClient,
              private _router: Router,
              private _toaster: ToastrService,
              @Optional() @Inject(API_BASE_URL) _baseUrl?: string) {
    super(_http, _router, _toaster, _baseUrl);
  }

  getAttendanceRecords(): Observable<IAttendanceRecord[]> { 
    return super.sendRequest(this.ATTENDANCE_FILTER_API, this.GET);
  }

  addAttendanceRecord(attendanceRecord: IAttendanceRecord): Observable<IAttendanceRecord> { 
    return super.sendRequest(this.ATTENDANCE_SET_API, this.POST, attendanceRecord);
  }

  deleteAttendanceRecord(attendanceRecordId: number): Observable<any> {
    return super.sendRequest(this.ATTENDANCE_SET_API, this.DELETE, attendanceRecordId);
  }

  updateAttendanceRecord(attendanceRecordId: number, attendanceRecordData: IAttendanceRecord): Observable<IAttendanceRecord> {
    return super.sendRequest(this.ATTENDANCE_SET_API, this.PUT, attendanceRecordData, attendanceRecordId);
  }
}