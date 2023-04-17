import { Component, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {  Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { MAP_TOKEN } from '../../../MapApp/src/app/MapToken';
import { entitiesByActiveCategorySelector, entityTreeActiveIDLevelSelector, entityTreeActivePathSelector, entityTreeIDSelector, entityTreePathSelector, pathByActiveCategorySelector, TREE_ADDENTITY, TREE_SETACTIVE } from './EntityTree.reducer';
import { most_log } from './most/most.log';
import { MOSTComponentService } from './most/mostcomponent.service';
import { MOSTShell_EntityActions, MOST_createShellEntityAction } from './MOSTShell.actions';
import { AtlasShell_createEntityAction } from 'atlas-shell-logic';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[MOSTComponentService]
})
export class AppComponent {
  title = 'StateMachineApp';
  path$ = this.store.select(entityTreeActivePathSelector("profile"))

  activeID:any 
  frm = new FormGroup({
    id:new FormControl('')
  })
  
  activeID$:Observable<any>
  constructor(private store:Store<any>,private router:Router,@Inject(MAP_TOKEN) private token:string){
     console.log("Running",this.token)
      
      this.store.select(state=>state)
      .subscribe(state=>{most_log(this,"STATE IS :",state);this.activeID = state.profile.activeID})
      
      this.store.select(entitiesByActiveCategorySelector("profile","profile"))
      .subscribe(s=>console.log("ACTIVE ENTITY",s))
      
      this.store.select(pathByActiveCategorySelector("profile","step"))
      .subscribe(p=>most_log(this,"ACTIVE CATEGORY PATH step",p))
   
      
     this.store.select(state=>state)
     .subscribe(state=>console.log("TREE STATE LEVEL 2",state))
     


     this.store.select(entityTreeActivePathSelector("profile"))
     .subscribe(activePath=>console.log("Active Path:",activePath))
     
     this.activeID$= this.store.select(entityTreeActiveIDLevelSelector("profile",1,"profile"))
     this.activeID$.subscribe(activeID=>console.log("Active ID LEVEL:",activeID))
     
     let actions = AtlasShell_createEntityAction("profile") as MOSTShell_EntityActions
     console.log("ACTIONS=>",actions)
     this.store.dispatch(actions.ADD_ENTITY({path:[],entity:{id:'123',category:"profileID"}}))
     this.store.dispatch(actions.ADD_ENTITY({path:["123"],entity:{id:'650',category:"profile"}}))

     this.store.dispatch(actions.ADD_ENTITY({path:[],entity:{id:'456',category:"profileID"}}))
     
     //this.store.dispatch(actions.ADD_ENTITY({path:["456"],entity:{id:'450',category:"profile"}}))


    
     
  }
  ngAfterViewInit(){
  
      
  }
  
  
  DO(id:string){
    console.log("LEVEL ID",id)
    this.store.dispatch(MOST_createShellEntityAction("profile").ACTIVATE_ENTITY({path:[],entity:{id:id,category:"profileID"}}))
   
   
  }
  NAVTO(id:string){
    this.router.navigate([{outlets:{"profile":id}}])
  }
  
}
