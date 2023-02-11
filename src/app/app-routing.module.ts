import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< Updated upstream
import { EmpformComponent } from './empform/empform.component';
import { EmplistComponent } from './emplist/emplist.component';

const routes: Routes = [
  {path:"form",component:EmpformComponent},
  {path:"list",component:EmplistComponent},
  {path:"edit/:id",component:EmpformComponent}
=======
import { RegisterComponent } from './register/register.component';
import { SingleComponent } from './single/single.component';
import { UsertableComponent } from './usertable/usertable.component';

const routes: Routes = [
{path:"form",component:RegisterComponent},
{path:"table",component:UsertableComponent},
{path:"table/:id",component:RegisterComponent},
{path:"single",component:SingleComponent}
>>>>>>> Stashed changes
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