import { Inject, Injectable, Optional } from '@angular/core';
import { API_BASE_URL, BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IShift } from '../../models/shift.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShiftService extends BaseService {

  private SHIFT_FILTER_API = "/api/warehouse/shifts/filter/"
  private SHIFT_SET_API = "/api/warehouse/shift/"; 

  constructor(private _http: HttpClient,
              private _router: Router,
              private _toaster: ToastrService,
              @Optional() @Inject(API_BASE_URL) _baseUrl?: string) {
    super(_http, _router, _toaster, _baseUrl);
  }

  getShifts(): Observable<IShift[]> {
    return super.sendRequest(this.SHIFT_FILTER_API, this.GET);
  }

  addShift(shift: IShift): Observable<IShift> {
    return super.sendRequest(this.SHIFT_SET_API, this.POST, shift);
  }

  deleteShift(shiftId: number): Observable<any> {
    return super.sendRequest(this.SHIFT_SET_API, this.DELETE, shiftId);
  }

  updateShift(shiftId: number, shiftData: IShift): Observable<IShift> {
    return super.sendRequest(this.SHIFT_SET_API, this.PUT, shiftData, shiftId);
  }
}