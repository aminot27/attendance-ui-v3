// src/app/services/parent-update.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentUpdateService {
  private parentAddedSource = new Subject<void>();
  parentAdded$ = this.parentAddedSource.asObservable();

  constructor() { }

  notifyParentAdded() {
    this.parentAddedSource.next();
  } 
}