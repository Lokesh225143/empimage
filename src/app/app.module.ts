import { NgModule } from '@angular/core';
<<<<<<< Updated upstream
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
=======
import { ReactiveFormsModule } from '@angular/forms';
>>>>>>> Stashed changes
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, empRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< Updated upstream
import { HeaderComponent } from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import { EmployeeComponent } from './emplist/employee/employee.component';
import { FilterPipe } from './filter.pipe';
import { EmpService } from './emp.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
   empRoutes,
   EmployeeComponent,
   FilterPipe,
   
=======
import { RegisterComponent } from './register/register.component';
import { UsertableComponent } from './usertable/usertable.component';
import {HttpClientModule} from '@angular/common/http';
import { SingleComponent } from './single/single.component'
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    UsertableComponent,
    SingleComponent
>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
<<<<<<< Updated upstream
    HttpClientModule,
    FormsModule
    
=======
    HttpClientModule
>>>>>>> Stashed changes
  ],
  providers: [EmpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
