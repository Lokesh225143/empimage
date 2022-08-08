import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmpService {

  baseUrl = environment.api;
  public search = new Subject<string>();
  // search$ = this.search.asObservable();
  constructor(private _http: HttpClient) { }
  // getmethod
  getAllEmp(): Observable<Employee[]> {
    return this._http.get<Employee[]>(`${this.baseUrl}`);
  }
 
  // empid for update
  getEmp(id: number): Observable<Employee> {
    return this._http.get<Employee>(`${this.baseUrl + '/' + id}`)
  }

  // postmethod
  postEmp(employee: Employee): Observable<Employee[]> {
    return this._http.post<Employee[]>(`${this.baseUrl}`, employee);
  }
  // updateMethod
  updateEmp(data: Employee):Observable<Employee[]>{
    return this._http.put<Employee[]>(`${this.baseUrl}/${data.id}`, data);
  }

  //deleteMethod
  deleteEmp(id: string): Observable<Employee[]> {
    return this._http.delete<Employee[]>(`${this.baseUrl + '/' + id}`);
  }

 setQuery(query:any){
  this.search.next(query);
 }

 getQuery(){
  return this.search.asObservable();
 }

}
