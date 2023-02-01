import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AtlasComponentContainerComponent } from 'atlas-redux';
import { ADDOPERATION } from 'src/app/context.reducer';
import { NAVENTITY } from 'src/app/effect.service';
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
  profileID$ = this.store.select(state=>state.profile.activeID.profileID)
  profileID = ''
  URL = this.router.url
  @ViewChild(AtlasComponentContainerComponent) container!:AtlasComponentContainerComponent
  constructor(private store:Store<any>,private router:Router,private activatedRoute:ActivatedRoute) {
      console.log("We are here")
     
   }

  ngOnInit(): void {
    //this.store.dispatch(NAVENTITY({router:this.router.url}))
    this.profileID$.subscribe(profile=>{console.log("PROFILEID LEVEL 2",profile);this.profileID=profile})
    
  }
  ngAfterViewInit(){
  
   /* this.step$= this.store.select(entityTreeActiveIDLevelSelector("profile",this.container.level+1,"step"))
    this.step$.subscribe(activeID=>console.log("Active ID LEVEL 2 STEP:",activeID))
    this.stepInfo$ = this.store.select(entityTreeActiveIDLevelSelector("profile",this.container.level+1,"Info"))
    this.stepInfo$.subscribe(activeID=>console.log("INFO=>>>Active ID LEVEL 2:",activeID))*/
   
    console.log("OP650:",this.activatedRoute)

  }
  DO(step:string){
    this.store.dispatch(ADDOPERATION({path:[this.profileID,"650"],entity:{id:step,category:"step"}}))
  }
  DO2(step:string){
    this.store.dispatch(ADDOPERATION({path:[this.profileID,"650"],entity:{id:step,category:"Info"}}))
  }

}
  