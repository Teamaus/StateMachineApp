import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Op550Component } from './op550/op550.component';

const routes: Routes = [
  {path:'',component:Op550Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Op550RoutingModule { }
