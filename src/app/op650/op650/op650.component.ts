import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AtlasComponentContainerComponent } from 'atlas-redux';
import { ADDOPERATION } from 'src/app/context.reducer';
import { entityTreeActiveIDLevelSelector } from 'src/app/EntityTree.reducer';
import { STEP, STEPINFO } from '../op650.reducer';

@Component({
  selector: 'app-op650',
  templateUrl: './op650.component.html',
  styleUrls: ['./op650.component.css']
})
export class Op650Component implements OnInit {
  step$ = this.store.select(state=>state.op650.step)
  stepInfo$ = this.store.select(state=>state.op650.stepInfo)
  @ViewChild(AtlasComponentContainerComponent) container!:AtlasComponentContainerComponent
  constructor(private store:Store<any>) {
      console.log("We are here")
    
   }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(){
    console.log("CONTAINER",this.container.url,this.container.level)
    this.step$= this.store.select(entityTreeActiveIDLevelSelector("profile",this.container.level+1,"step"))
    this.step$.subscribe(activeID=>console.log("Active ID LEVEL 2:",activeID))
    this.stepInfo$ = this.store.select(entityTreeActiveIDLevelSelector("profile",this.container.level+1,"Info"))

  }
  DO(step:string){
    this.store.dispatch(ADDOPERATION({path:["123","650"],entity:{id:step,category:"step"}}))
  }
  DO2(step:string){
    this.store.dispatch(ADDOPERATION({path:["123","650"],entity:{id:step,category:"Info"}}))
  }

}
  