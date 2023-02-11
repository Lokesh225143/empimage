import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from '../confirmpassword';
import { RegisterService } from '../register.service';
import { User } from '../user';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
  registrationForm!: FormGroup
  isSubmitt = false;
  actionButton: string = "Save";
  user: any;
  @Input() userarr!: User
  _router: any;
  empId!: number;
  genderValue = '';
  selectedGender = '';
  users: any;
  isEdit = false;
  userId: any;
  constructor(private _myfb: FormBuilder,
    private _registerService: RegisterService,
  ) {
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
    }, {
      validator: ConfirmPasswordValidator("password", "confirmpassword")
    })
  }

  ngOnInit(): void {
    this.getUsers()
  }
  onSubmit(registrationForm: any) {
    if (this.registrationForm.valid) {
      this.isSubmitt = false;
      if (this.isEdit) {
        alert('update successfully')
        this.upDateUser();
      }
      else {
        this._registerService.postEmp(registrationForm.value).subscribe(
          {
            next: (res: any) => {
              alert('postSuccessfully');
              this.getUsers()
              console.log(res);
            }, error(err: any) {
              alert('error while post')
            }
          }
        )
      }
    } else {
      this.isSubmitt = true;
    }



  }

  edit(user: any) {
    this.isEdit = true;
    this.actionButton = "Update";
    this.registrationForm.controls['firstName'].setValue(user.firstName);
    this.registrationForm.controls['lastName'].setValue(user.lastName);
    this.registrationForm.controls['email'].setValue(user.email);
    this.registrationForm.controls['phone'].setValue(user.phone);
    this.registrationForm.controls['company'].setValue(user.company);
    this.registrationForm.controls['gender'].setValue(user.gender);
    this.registrationForm.controls['dob'].setValue(user.dob);
    this.registrationForm.controls['password'].setValue(user.password);
    this.registrationForm.controls['confirmpassword'].setValue(user.confirmpassword);
    this.userId = user.id;
  }

  upDateUser() {
    debugger
    let formData = { ...this.registrationForm.value, id: this.userId }
    this._registerService.updateEmps(formData).subscribe(
      res => {
        console.log(res);
        this.getUsers()
      })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }
  reset() {
    this.registrationForm.reset()
  }
  getUsers() {
    this._registerService.getAllEmp().subscribe(
      {
        next: (res: any) => {
          this.users = res;
          console.log(res);
        }, error(err: any) {
          alert('error while getting')
        }
      }
    )
  }
  deleteUser(id: number) {
    this._registerService.deleteEmp(id).subscribe(
      data => {
        alert('deleted record');
        this.getUsers()
      }, err => {
        alert('error while deleted')
      }
    )
  }

}
