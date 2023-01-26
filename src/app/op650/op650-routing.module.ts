import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtlasReduxModule } from 'atlas-redux';
import { Op650Component } from './op650/op650.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';

const routes: Routes = [
  {path:'',component:Op650Component,children:[
    {path:"1",component:Step1Component,outlet:"step"},
    {path:"2",component:Step2Component,outlet:"step"},
    {path:"3",component:Step3Component,outlet:'Info'},
    

    
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Op650RoutingModule { }
