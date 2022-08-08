import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmpService } from '../emp.service';
import { EmpformComponent } from '../empform/empform.component';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-emplist',
  templateUrl: './emplist.component.html',
  styleUrls: ['./emplist.component.css']
})
export class EmplistComponent implements OnInit {
  output: any;
  // model
  employees: Employee[] = []; //empty array mustneed store the getten response
  // displaydata
  employeesToDisplay: Employee[]=[];
  // for serachvalue
 array:any
 @ViewChild(EmpformComponent) empForm!:EmpformComponent 
   constructor(private _empService: EmpService,
    private _router: Router) {
    this.employeesToDisplay = this.employees;
  }

  ngOnInit() {
    this.getempData();
   
    // this._empService.search$.subscribe(val =>{
    //   this.output = val;
    // })
    // console.log(this.output);
  }

  getempData() {
    this._empService.getAllEmp().subscribe(
      {
        next: (res) => {
          for (let emp of res) {
            this.employees.push(emp)//data send to modal
          }
          this.employeesToDisplay = this.employees;//data will display in browser
          this.array= res;
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  editEmp(event: any) {
    // alert('editSuccessfully');
    // this._router.navigate(['edit/:id']) call the router eaither parent or child
    this.empForm.ActionButton="Update"
    this.employees.forEach((val, ind) => {
      if (val.id === event) {
       this.empForm.editEmployeeForm(val);
      }
    });
    
  }

  //  delteemp
  deleteEmp(event: any) {
    alert('deleted successfully')
    this.employees.forEach((val, index) => {
      if (val.id === parseInt(event)) {
        this._empService.deleteEmp(event).subscribe((res) => {
          this.employees.splice(index, 1);
        });
      }
    });
  }

}
