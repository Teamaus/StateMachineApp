import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { createEntityAdapter } from '@ngrx/entity';
import { combineReducers, createFeatureSelector, createSelector, Store, union} from '@ngrx/store';
import { StoreFeature } from '@ngrx/store/src/models';
import { AtlasComponentContainerComponent } from 'atlas-redux';
import { Observable } from 'rxjs';
import { activeContextSelector, ADDOPERATION, getCurrentContext$, SETSHELLCONTEXT } from './context.reducer';
import { EffectService } from './effect.service';
import { TreeEntityAdapter } from './EntityTree.model';
import { entityTreeActiveIDLevelSelector, entityTreeActivePathSelector, entityTreeIDSelector, entityTreePathSelector, TREE_ADDENTITY, TREE_SETACTIVE } from './EntityTree.reducer';
import { ShellContextService } from './shell-context.service';
import { A, B, createCompositeAction, D, F, S } from './StateMachine.reducer';
import { A1, A1A2, A2, T1Reducer } from './TestReducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StateMachineApp';
  frm = new FormGroup({
    id:new FormControl('')
  })
  @ViewChild(AtlasComponentContainerComponent) container!:AtlasComponentContainerComponent
  activeID$:Observable<any>
  constructor(private store:Store<any>,private shellContextService:ShellContextService){
    console.log("Running")
      
      this.store.select(state=>state)
      .subscribe(state=>console.log("STATE IS :",state))
      
      let feature1 = createFeatureSelector("T")
      let feature2 = createFeatureSelector("T")

      this.store.select(feature1)
      

      this.store.select(feature2)
      
      
   /*   let f3 = createSelector(
          feature1,feature2,
          (t1:any,t2:any)=>{return {...t1.T1,...t2.T2}}
      )
      this.store.select(f3)
      .subscribe(t=>console.log("=>>>>",t))*/
      let adapter = new TreeEntityAdapter()
      let entityAdapter = createEntityAdapter()

      let state = entityAdapter.getInitialState()
      console.log("TREE IS:",state)
    //  state = adapter.addEntity(state,[],{id:"123"})

      console.log("TREE IS:",state)
     this.store.select(state=>state)
     .subscribe(state=>console.log("TREE STATE",state))
     


     this.store.select(entityTreeActivePathSelector("profile"))
     .subscribe(activePath=>console.log("Active Path:",activePath))
     
     this.activeID$= this.store.select(entityTreeActiveIDLevelSelector("profile",1,"profile"))
     this.activeID$.subscribe(activeID=>console.log("Active ID LEVEL:",activeID))
     

     this.store.dispatch(ADDOPERATION({path:[],entity:{id:'123',category:"profileID"}}))
     this.store.dispatch(ADDOPERATION({path:["123"],entity:{id:'650',category:"profile"}}))
     
     
     
    
     
  }
  ngAfterViewInit(){
  
      this.activeID$= this.store.select(entityTreeActiveIDLevelSelector("profile",this.container.level+1,"profile"))
      this.activeID$.subscribe(activeID=>console.log("Active ID LEVEL:",activeID))
      
  }
  UpdateID(){
    let id = this.frm.get("id")!.value
    this.store.dispatch(A({ID:id}))
    
  }
  SetActive(){
    let id = this.frm.get("id")!.value
    this.store.dispatch(B({ID:id}))
  }
  DeActivate(){
    let id = this.frm.get("id")!.value
    this.store.dispatch(D())
  }
  SearchID(){
    let id = this.frm.get("id")!.value
    this.store.dispatch(S({ID:id}))
  }
  F(){
    this.store.dispatch(F())
    
  }
  T1(){
    this.store.dispatch(A1({A1:"Hello"}))
  }
  T2(){
    this.store.dispatch(A2({A2:"Hello2"}))
  }
  T1T2(){
    let a1:any= new Array(1000)
    let a2:any= new Array(1000)

    for (let i=0;i<1000;i++)
    {
      a1[i] = A1({A1:"bye1"+i})
      a2[i] = A2({A2:"bye2"+i})
    
      
    }
    this.store.dispatch(createCompositeAction("A",...a1,...a2))
  }
  T1_T2(){
    for (let i=0;i<1000;i++){
      this.store.dispatch(A1({A1:"SeeYa1"+i}))
      this.store.dispatch(A2({A2:"SeeYa2"+i}))  
    }
    
  }
  EFFECT(){
    this.store.dispatch(A1A2())
  }
  Ope1(){
    let id = this.frm.get("id")!.value
    let ids = id.split(',')
    let parent = ''
    if (ids.length>1){
        parent = ids[1]
    }
    
 //   let  context = this.shellContextService.addNewOperation(getCurrentContext$(),{id:ids[0],outlet:'profile',operation:[]},parent)

  }

}
