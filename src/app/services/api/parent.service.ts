import { Inject, Injectable, Optional } from '@angular/core';
import { API_BASE_URL, BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IParent } from '../../models/parent.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentService extends BaseService {

  private PARENT_FILTER_API = "/api/warehouse/parents/filter/";
  private PARENT_SET_API = "/api/warehouse/parent/";

  constructor(private _http: HttpClient,
              private _router: Router,
              private _toaster: ToastrService,
              @Optional() @Inject(API_BASE_URL) _baseUrl?: string) {
    super(_http, _router, _toaster, _baseUrl);
  }

  getParents(): Observable<IParent[]> {
    return super.sendRequest(this.PARENT_FILTER_API, this.GET);
  }

  addParent(parent: IParent): Observable<IParent> {
    return super.sendRequest(this.PARENT_SET_API, this.POST, parent);
  }

  deleteParent(parentId: number): Observable<any> {
    return super.sendRequest(this.PARENT_SET_API, this.DELETE, parentId);
  }

  updateParent(parentId: number, parentData: IParent): Observable<IParent> {
    return super.sendRequest(this.PARENT_SET_API, this.PUT, parentData, parentId);
  }
}