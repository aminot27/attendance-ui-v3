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
export class ScanService extends BaseService {

  private SCAN_SET_API = "/api/warehouse/scan/"; 

  constructor(private _http: HttpClient,
              private _router: Router,
              private _toaster: ToastrService,
              @Optional() @Inject(API_BASE_URL) _baseUrl?: string) {
    super(_http, _router, _toaster, _baseUrl);
  }


  sendDni(dni: String): Observable<any> {
    const body = { dni };
    return super.sendRequest(this.SCAN_SET_API, this.POST, body);
  }
}