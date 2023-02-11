import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { User } from '../user';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit {
   users:any
   public registerForm = FormGroup;
   @Input() user!:User
  constructor(private _registerService:RegisterService,
    private _route:Router,
    ) { }

  ngOnInit(): void {
    this.getUsers()
    
  }

  getUsers(){
    this._registerService.getAllEmp().subscribe(
      {
        next:(res:any)=>{
         this.users = res;
         console.log(res);
        },error(err:any){
          alert('error while getting')
        }
      }
    )
  }
  updateUser(id:Number){
    this._route.navigate(['table/',id])
  }
  deleteUser(id:number){
    this._registerService.deleteEmp(id).subscribe(
      // {
      //   next(res:any){
      //     alert('deleted record');
      //   },error(err:any){
      //     alert('error while deleted')
      //   }
      // }
      data=> {
        alert('deleted record');
        this.getUsers()
      }, err =>{
        alert('error while deleted')
      }
    )
  }

}
