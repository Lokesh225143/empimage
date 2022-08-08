import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EmpService } from '../emp.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-empform',
  templateUrl: './empform.component.html',
  styleUrls: ['./empform.component.css']
})
export class EmpformComponent implements OnInit {
  public ActionButton:string = 'Insert';
  @ViewChild('fileInput') fileInput: any;
  // formName
  employeeForm: FormGroup;
  // Model for data posting
  employees: Employee[] = []
  @Input() employee!: Employee;

  public education = [
    '10th pass',
    'diploma / inter',
    'graduate',
    'post graduate',
    'PhD',
    'film industry'
  ];
  public educate =[
    '12th pass',
    'inter'
  ]
  constructor(private _formbuilder: FormBuilder,
    private _empService: EmpService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
    this.employeeForm = _formbuilder.group({});
    this.employees = [];
  }

  ngOnInit() {
    this.employeeForm = this._formbuilder.group({
      firstname: [''],
      lastname: [''],
      birthday: [''],
      gender: [''],
      education: [''],
      company: [''],
      jobExperience: [''],
      salary: [''],
    })
    // for editemplyee  receive the id(step2)
    this._activatedRoute.paramMap.subscribe(
      (param: ParamMap) => {
        let empId = parseInt(param.get('id') as any);
        if (empId) {
          // updatedata
          this.getEmpId(empId);
        }
        else {
          // forpostdata
          this.employee = {
            firstname: "",
            lastname: '',
            birthday: '',
            gender: '',
            education: '',
            company: '',
            jobExperience: 0,
            salary: 0,
            profile: ''
          }
        }
      }
    )

  }

  get f(): { [key: string]: AbstractControl } {
    return this.employeeForm.controls;
  }



  addEmployee() {
    // step5
    this.mapValuesToEmployeeModel();
    if (this.employee.id) {
      this._empService.updateEmp(this.employee).subscribe(
        () => this._router.navigate(['list']),
        (err: any) => console.log(err),
      )
    } else {
      this._empService.postEmp(this.employeeForm.value).subscribe(
        {
          next: (res: any) => {
            console.log(res);
            this.employees.unshift(res)
            alert('post Successfully')
            this.employeeForm.reset();
          }, error: (err) => {
            console.log(err);
          }
        }
      )
    }
       
    // let employee: Employee = {
    //   firstname: this.employeeForm.value.firstname,
    //   lastname: this.employeeForm.value.lastname,
    //   birthday: this.employeeForm.value.birthday,
    //   gender: this.employeeForm.value.gender,
    //   education: this.employeeForm.value.education,
    //   company: this.employeeForm.value.company,
    //   jobExperience: this.employeeForm.value.jobExperience,
    //   salary: this.employeeForm.value.salary,
    //   profile: this.fileInput.nativeElement.files[0]?.name,
    // }

  }

  // (step3 for edit)
  getEmpId(id: number) {
    this._empService.getEmp(id).subscribe(
      (employee: Employee) => {
        this.editEmployeeForm(employee);
        this.employee = employee;
      }, (err: any) => {
        alert('error while edit')
      }
    )
  }

  // (step1 for edit)
  editEmployeeForm(employee: Employee) {
    this.employeeForm.patchValue({
      firstname: employee.firstname,
      lastname: employee.lastname,
      birthday: employee.birthday,
      gender: employee.gender,
      education: employee.education,
      company: employee.company,
      jobExperience: employee.jobExperience,
      salary: employee.salary,
    })
    // this.employeeForm.controls['firstname'].setValue(employee.firstname);
    // this.employeeForm.controls['lastname'].setValue(employee.lastname);
    // this.employeeForm.controls['birthday'].setValue(employee.birthday);
    // this.employeeForm.controls['gender'].setValue(employee.gender);
    // this.employeeForm.controls['education'].setValue(employee.education);
    // this.employeeForm.controls['company'].setValue(employee.company);
    // this.employeeForm.controls['jobExperience'].setValue(employee.jobExperience);
    // this.employeeForm.controls['salary'].setValue(employee.salary);
    // this.fileInput.nativeElement.files[0]?.name
  }

  // ( (step4)map value for get the updatedValues)
  mapValuesToEmployeeModel() {
      this.employee.firstname = this.employeeForm.value.firstname,
      this.employee.lastname = this.employeeForm.value.lastname,
      this.employee.birthday = this.employeeForm.value.birthday,
      this.employee.gender = this.employeeForm.value.gender,
      this.employee.education = this.employeeForm.value.education,
      this.employee.company = this.employeeForm.value.company,
      this.employee.jobExperience = this.employeeForm.value.jobExperience,
      this.employee.salary = this.employeeForm.value.salary,
      this.employee.profile = this.fileInput.nativeElement.files[0]?.name
  }

  // clearForm() {
  //    this.f.employeeForm.setValue({
  //      firstname: this.f.employeeForm.value.firstname,
  //      lastname: this.f.employeeForm.value.lastname,
  //      birthday: this.f.employeeForm.value.birthday,
  //      gender: this.f.employeeForm.value.gender,
  //      education: this.f.employeeForm.value.education,
  //      company: this.f.employeeForm.value.company,
  //      jobExperience: this.f.employeeForm.value.jobExperience,
  //      salary: this.f.employeeForm.value.salary,
  //    })
  //    this.fileInput.nativeElement.value = '';
  // }

}
