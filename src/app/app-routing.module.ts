import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtlasReduxModule } from 'atlas-redux';

const routes: Routes = [
  {path:'650',loadChildren:()=>import('../app/op650/op650.module').then(m=>m.Op650Module),outlet:"profile"},
  {path:'550',loadChildren:()=>import('../app/op650/op650.module').then(m=>m.Op650Module),outlet:"profile"},
  {path:'210',loadChildren:()=>import('../app/op650/op650.module').then(m=>m.Op650Module),outlet:"profile"},
  {path:'910',loadChildren:()=>import('../app/op650/op650.module').then(m=>m.Op650Module),outlet:"profile"}






];

@NgModule({
  imports: [RouterModule.forRoot(routes),AtlasReduxModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
