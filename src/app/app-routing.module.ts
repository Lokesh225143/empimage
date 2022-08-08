import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpformComponent } from './empform/empform.component';
import { EmplistComponent } from './emplist/emplist.component';

const routes: Routes = [
  {path:"form",component:EmpformComponent},
  {path:"list",component:EmplistComponent},
  {path:"edit/:id",component:EmpformComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const empRoutes=[
  EmpformComponent,
  EmplistComponent
]