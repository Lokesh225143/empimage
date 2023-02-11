import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
baseUrl=environment.api;
  constructor(private _http:HttpClient) { }

  getAllEmp(): Observable<User[]> {
    return this._http.get<User[]>(`${this.baseUrl}`);
  }
 
  // empid for update
  getEmp(id: number): Observable<User> {
    return this._http.get<User>(`${this.baseUrl + '/' + id}`)
  }

  // postmethod
  postEmp(employee: User): Observable<User[]> {
    return this._http.post<User[]>(`${this.baseUrl}`, employee);
  }
  // updateMethod
  updateEmp(data: User , id : number):Observable<User[]>{
    return this._http.put<User[]>(`${this.baseUrl+ '/' + id }`, data);
  }
  updateEmps(data: User ):Observable<User[]>{
    return this._http.put<User[]>(`${this.baseUrl+ '/' + data.id }`, data);
  }
 

  //deleteMethod
  deleteEmp(id: number): Observable<User[]> {
    return this._http.delete<User[]>(`${this.baseUrl + '/' + id}`);
  }
}
