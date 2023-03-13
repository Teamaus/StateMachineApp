import { Inject, Injectable, InjectionToken, Type } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {map, switchMap, tap} from 'rxjs/operators'
import { Action, ActionCreator, createAction, props } from '@ngrx/store';
import { CompositeAction, createCompositeAction } from './StateMachine.reducer';

import { Observable, of } from 'rxjs';

import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TREE_ADDENTITY, TREE_NOACTION, TREE_SETACTIVE } from './EntityTree.reducer';

import { MOSTSnapshotService } from './most/mostsnapshot.service';
import { MOST_createShellEntityAction } from './MOSTShell.actions';
import { ThrowStmt } from '@angular/compiler';

export const SLICES = new InjectionToken<string[]>("SLICES")
export const NAVENTITY = createAction("NAVENTITY",props<any>())

export const goBack = (activatedRoute:ActivatedRoute ,level:number):any=>
{
    if (activatedRoute.parent)
      console.log("ACTIVE  and Level",activatedRoute.snapshot.url,level);
    else{
      console.log("ACTIVE  unefined");
    }
    return level==0?activatedRoute:activatedRoute.parent?goBack(activatedRoute.parent,level-1):activatedRoute}
export const urlLevel=(url:string)=>url=="/"?0:url.replace("//","").split("/").length-1

function MOSTCreateEffect(actions$:Actions<Action>,triggerAction:ActionCreator<any>,serviceFunc:(data:any)=>Observable<any>,composeActionFunc:(triggerActionParameters:any,data:any)=>CompositeAction)
{
    return createEffect(
      ()=>actions$.pipe(
        ofType(triggerAction),
        tap(data=>console.log("EFFECT",data)),
        switchMap((triggerActionParamters:any)=>serviceFunc(triggerActionParamters).pipe(
            map(data=>[triggerActionParamters,data]),
            tap(([triggerActionParameters,data])=>console.log("EFFECT 2",data)),
           switchMap(([triggerActionParameters,data])=>of(...composeActionFunc(triggerActionParameters,data).actions))
        ))  
      
        
         
            
         
        )
      
        
      )
    
}
@Injectable({
  providedIn: 'root'
})
export class EffectService{

  
  addEffectFunc = (slice:string)=>{
    console.log("Creating Effect",slice)
    return createEffect(
    ()=>this.actions$.pipe(
      ofType(MOST_createShellEntityAction(slice).ADD_ENTITY),
      tap(data=>console.log("ADD=>EFFECT",data)),
      switchMap((actionParameters)=>this.snapShotService.saveSnapshot$(slice)
      .pipe(
          tap(data=>console.log("IN HERE EFFECT DATA ACTION",data)),
          switchMap(data=>[createCompositeAction("COMPOSITE",data,TREE_ADDENTITY(slice)({path:actionParameters.path,entity:actionParameters.entity}),TREE_SETACTIVE("profile")({path:actionParameters.path,id:actionParameters.entity.id}))])
      ))
    )
  )}
  activeEffectFunc =(slice:string)=> createEffect(
    ()=>this.actions$.pipe(
      ofType(MOST_createShellEntityAction(slice).ACTIVATE_ENTITY),
      tap(data=>console.log("ACTIVATE=>EFFECT",data)),
      switchMap((actionParameters)=>this.snapShotService.saveSnapshot$(slice)
      .pipe(
          tap(data=>console.log("IN HERE EFFECT",actionParameters)),
          switchMap(data=>[createCompositeAction("COMPOSITE",data,TREE_SETACTIVE("profile")({path:actionParameters.path,id:actionParameters.entity.id}))])
      ))
    )
  )
  //addOperation = this.addEffectFunc("profile")
  

  
  constructor(private actions$:Actions,private snapShotService:MOSTSnapshotService,@Inject(SLICES) private slices:string[]){

      console.log("SLICES=>>>",this.slices)
      let obj = this as any
      this.slices.map((slice,index)=>obj["addeffects"+index] = 
      this.addEffectFunc(slice))
      this.slices.map((slice,index)=>obj["activeEffects"+index] = 
      this.activeEffectFunc(slice))


       
      
   }
}
