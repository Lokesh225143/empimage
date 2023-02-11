import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ConfirmPasswordValidator } from '../confirmpassword';

import { RegisterService } from '../register.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup
  // submitt = false;
  actionButton: string | undefined;
  user: any;
  @Input() userarr!: User
  _router: any;
  empId!: number;
  genderValue='';
  selectedGender='';
  constructor(private _myfb: FormBuilder,
    private _registerService: RegisterService,
    private _activatedRoute: ActivatedRoute) {
    this.registrationForm = this._myfb.group({
      firstName: ['', [Validators.required,]],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      company: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    },{
      validator: ConfirmPasswordValidator("password","confirmpassword")
    })
  }

  ngOnInit(): void {

    this._activatedRoute.paramMap.subscribe(
      (param: ParamMap) => {
        this.empId = parseInt(param.get('id') as any);
        if (this.empId) {
          // updatedata
          this.getEmpId(this.empId);
        }
        else {
          // forpostdata
          this.userarr = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            gender: '',
            dob: '',
            password: '',
            confirmpassword: ''
          }
        }
      }
    )

  }

  onSubmit(registrationForm: any) {
    // console.log(registrationForm.value);
    // this.submitt=true;
    this.mapValuesToEmployeeModel();
    if(this.empId){
      alert('update successfully')
      this._registerService.updateEmp(this.registrationForm.value,this.empId).subscribe(
        () => this._router.navigate(['table']),
        (err: any) => console.log(err),
      )
    }
   else{
    this._registerService.postEmp(registrationForm.value).subscribe(
      {
        next: (res: any) => {
          alert('postSuccessfully')
          console.log(res);
        }, error(err: any) {
          alert('error while post')
        }
      }
    )
   }


  }

  getEmpId(id: number) {
    this._registerService.getEmp(id).subscribe(
      (user: User) => {
        this.editEmployeeForm(user);
        this.user = user;
      }, (err: any) => {
        alert('error while edit')
      }
    )
  }


  editEmployeeForm(user: User) {
    this.registrationForm.controls['firstName'].setValue(user.firstName);
    this.registrationForm.controls['lastName'].setValue(user.lastName);
    this.registrationForm.controls['email'].setValue(user.email);
    this.registrationForm.controls['phone'].setValue(user.phone);
    this.registrationForm.controls['company'].setValue(user.company);
    this.registrationForm.controls['gender'].setValue(user.gender);
    this.registrationForm.controls['dob'].setValue(user.dob);
    this.registrationForm.controls['password'].setValue(user.password);
    this.registrationForm.controls['confirmpassword'].setValue(user.confirmpassword);
  }

  mapValuesToEmployeeModel() {
    if(this.userarr){
        this.userarr.firstName = this.registrationForm.value.firstName,
        this.userarr.lastName = this.registrationForm.value.lastName,
        this.userarr.email = this.registrationForm.value.email,
        this.userarr.phone = this.registrationForm.value.phone,
        this.userarr.company = this.registrationForm.value.company,
        this.userarr.gender = this.registrationForm.value.gender,
        this.userarr.dob = this.registrationForm.value.dob,
        this.userarr.password = this.registrationForm.value.password,
        this.userarr.confirmpassword = this.registrationForm.value.confirmpassword
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }

  reset() {
    this.registrationForm.reset();
  }

  radioChangeHandler(event: any) {
    this.selectedGender = event.target.value;
  }
  formErrors = {
    gender: '',
  };
}









