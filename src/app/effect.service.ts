import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { A1, A1A2, A2 } from './TestReducers';
import {switchMap, tap} from 'rxjs/operators'
import { createAction, props } from '@ngrx/store';
import { createCompositeAction } from './StateMachine.reducer';
import { ADDOPERATION } from './context.reducer';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TREE_NOACTION } from './EntityTree.reducer';
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

@Injectable({
  providedIn: 'root'
})
export class EffectService {

  effect = createEffect(
    ()=>this.actions$.pipe(
      ofType(A1A2),
      tap(data=>console.log("HERE EFFECT",(data as any).route)),
      switchMap((data:any)=>
      [
        A1({A1:"EFFECT1"}),A2({A2:"EFFECT2"})
    ])
    )
  )
  routingEffect = createEffect(
    ()=>this.actions$.pipe(
      ofType(NAVENTITY),
      tap(data=>console.log("HERE EFFECT",(data as any).route)),
      
      tap ((data:any)=>
      {
        let route = (data as any).route
        if (route)
        {
          route = {...route,_futureSnapshot:{...route.futureSnapshot}}
          this.router.navigate([{outlets:{[data.entity.category]:data.entity.id}}])
        }
        else
          this.router.navigate([{outlets:{[data.entity.category]:data.entity.id}}])

      }),
      
      switchMap(data=>[TREE_NOACTION()])
      
    )
  )
  
  constructor(private actions$:Actions,private router:Router,private activatedRoute:ActivatedRoute) 
  {

        console.log(this.effect)
        this.router.events.subscribe(
          (event:any)=>{
            if (event instanceof NavigationEnd){
                 
            }
          }
        )

   }
}
