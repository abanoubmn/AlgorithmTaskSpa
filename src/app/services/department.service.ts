import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  baseUrl = environment.apiURL;

  constructor(private http: HttpClient) { }
  postDepartment(department: any) {
    return this.http.post(this.baseUrl + 'api/department', department)
  }

  getDepartment(id: number) {
    if (id)
      return this.http.get(this.baseUrl + 'api/department/' + id);
    else
      return new Observable(null);
  }

  getDepartments() {
    return this.http.get(this.baseUrl + 'api/department');
  }

  updateDepartment(department: Department){
    return this.http.put(this.baseUrl + 'api/department', department)
  }

  deleteDepartment(id:number){
    return this.http.delete(this.baseUrl + 'api/department/' + id);
  }
}
