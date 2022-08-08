import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, empRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
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
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [EmpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
