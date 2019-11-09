import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  postEmployee(employee: Employee) {
    return this.http.post(this.baseUrl + 'api/employee', employee)
  }

  updateEmployee(employee: Employee) {
    return this.http.put(this.baseUrl + 'api/employee', employee)
  }

  getEmployee(id: number) {
    if (id)
      return this.http.get(this.baseUrl + 'api/employee/' + id);
    else
      return new Observable(null);
  }

  getEmployees(){
    return this.http.get(this.baseUrl + 'api/employee');
  }

  deleteEmployee(id:number){
    return this.http.delete(this.baseUrl + 'api/employee/' + id);
  }
}
