import { Component, ViewChild } from '@angular/core';
import { EmpService } from './emp.service';
import { EmplistComponent } from './emplist/emplist.component';
import { EmployeeComponent } from './emplist/employee/employee.component';
import { Employee } from './employee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'empimage';
  serachEmployee!:string
  output: any;
  constructor(private _empService:EmpService){}

  search(event:any){
      this.serachEmployee=(event.target as HTMLInputElement).value;
      this._empService.setQuery(this.serachEmployee)    
  }

}
