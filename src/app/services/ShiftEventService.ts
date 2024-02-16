// shift-event.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IShift } from '../models/shift.model';

@Injectable({
  providedIn: 'root'
})
export class ShiftEventService {
  private shiftAddedSource = new Subject<IShift>();
  shiftAdded$ = this.shiftAddedSource.asObservable();

  constructor() { }

  shiftAdded(shift: IShift) {
    this.shiftAddedSource.next(shift);
  }

  
}