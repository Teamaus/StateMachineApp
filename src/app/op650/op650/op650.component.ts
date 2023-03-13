import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AtlasComponentContainerComponent, entityActions } from 'atlas-redux';
import { TREE_ADDENTITY } from 'src/app/EntityTree.reducer';
import { most_log } from 'src/app/most/most.log';
import { MOSTComponentService } from 'src/app/most/mostcomponent.service';



import { MOST_createShellEntityAction } from 'src/app/MOSTShell.actions';


@Component({
  selector: 'app-op650',
  templateUrl: './op650.component.html',
  styleUrls: ['./op650.component.css'],
  providers:[MOSTComponentService]
})
export class Op650Component implements OnInit {
  step$ = this.store.select(state=>state.op650.step)
  stepInfo$ = this.store.select(state=>state.op650.stepInfo)
  profileID$ = this.store.select(state=>state.profile.activeID.profileID)
  profileID = ''
  URL = this.router.url
  actions = MOST_createShellEntityAction("profile")
  @ViewChild(AtlasComponentContainerComponent) container!:AtlasComponentContainerComponent
  constructor(private store:Store<any>,private router:Router,private activatedRoute:ActivatedRoute,private compService:MOSTComponentService) {
      console.log("We are here")
      this.compService.compName="OP650"
     
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
    //this.addEntities(true)

  }
  compActivated(act:any){
    console.log("ACTIVATED ROUTE=>>>",act)
  }
  addEntities(add:boolean){
    most_log(this,"ADD ENTITIES",add?"T":"F")
    if (add){
      
      this.DO("2")
      most_log(this,"2 ADDED")
      this.DO("1")
      most_log(this,"1 ADDED")
      this.DO2("3") 
      most_log(this,"3 ADDED")
     
    }
  }
  DO(step:string){
    this.store.dispatch(this.actions.ADD_ENTITY({path:[this.profileID,"650"],entity:{id:step,category:"step"}}))
  }
  DO2(step:string){
    this.store.dispatch(this.actions.ADD_ENTITY({path:[this.profileID,"650"],entity:{id:step,category:"Info"}}))
    
  }
  
  
}
  