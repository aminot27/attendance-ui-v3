import { Inject, Injectable, Optional } from '@angular/core';
import { API_BASE_URL, BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IStudent } from '../../models/student.model'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseService {
  private STUDENT_FILTER_API = "/api/warehouse/students/filter/"; 
  private STUDENT_SET_API = "/api/warehouse/student/"; 

  constructor(private _http: HttpClient,
              private _router: Router,
              private _toaster: ToastrService,
              @Optional() @Inject(API_BASE_URL) _baseUrl?: string) {
    super(_http, _router, _toaster, _baseUrl);
  }

  getStudents(): Observable<IStudent[]> { 
    return super.sendRequest(this.STUDENT_FILTER_API, this.GET);
  }

  addStudent(student: IStudent): Observable<IStudent> { 
    return super.sendRequest(this.STUDENT_SET_API, this.POST, student);
  }

  deleteStudent(studentId: number): Observable<any> {
    return super.sendRequest(this.STUDENT_SET_API, this.DELETE, studentId);
  }

  updateStudent(studentId: number, studentData: IStudent): Observable<IStudent> {
    return super.sendRequest(this.STUDENT_SET_API, this.PUT, studentData, studentId);
  }
}