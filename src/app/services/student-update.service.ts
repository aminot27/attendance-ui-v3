// src/app/services/student-update.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentUpdateService {
  private studentAddedSource = new Subject<void>();
  studentAdded$ = this.studentAddedSource.asObservable();

  constructor() { }

  notifyStudentAdded() {
    this.studentAddedSource.next();
  }
}