import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmpService } from 'src/app/emp.service';
import { EmpformComponent } from 'src/app/empform/empform.component';
import { Employee } from 'src/app/employee.model';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() employee!:Employee;
  @Output() onRemoveEmployee = new EventEmitter<number>()
  @Output() onEditEmployee = new EventEmitter<number>();
  @ViewChild(EmpformComponent) empForm!:EmpformComponent;
  searchKey:string='';
  array:any;
  employeesToDisplay: any;
  
  constructor(private _router:Router,
    private empService: EmpService) {
    this.employee={
      firstname:'',
      lastname:'',
      birthday:'',
      gender:'',
      education:'',
      company:'',
      jobExperience:0,
      salary:0,
      profile:''
    }
   }

  ngOnInit(): void {
    console.log(this.employee);
    this.empService.getQuery().subscribe(
      (val) =>{
         this.searchKey = val;
         this.employeesToDisplay = this.array.filter((value:any)=>{
          value.title.toLowerCase().includes(this.searchKey);
         })
      }
    )
  }

  editEmp(id:any){
    this.onEditEmployee.emit(this.employee.id);
    this._router.navigate(['edit/',id]);
    this.empForm.ActionButton="update";
  }


  deleteEmp(){
    this.onRemoveEmployee.emit(this.employee.id)
  }

}
