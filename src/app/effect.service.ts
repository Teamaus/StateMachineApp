import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { A1, A1A2, A2 } from './TestReducers';
import {switchMap, tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EffectService {

  effect = createEffect(
    ()=>this.actions$.pipe(
      ofType(A1A2),
      tap(data=>console.log("HERE EFFECT")),
      switchMap((data:any)=>
      [
        A1({A1:"EFFECT1"}),A2({A2:"EFFECT2"})
    ])
    )
  )
  constructor(private actions$:Actions) {
        console.log(this.effect)

   }
}
