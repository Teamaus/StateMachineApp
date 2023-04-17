import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createAction } from "@ngrx/store";
import { AtlasShellEffectService } from "atlas-shell-logic";
import { AtlasShellSnapshotService } from 'atlas-shell-logic'
import { atlas_log } from "atlas-utils";
import { of } from "rxjs";
import { switchMap, tap } from "rxjs/operators";



export const EchoAction = createAction("GetEcho")
const NA = createAction("NA")


@Injectable(

)
export class Step1EchoService{
   
    constructor(private actions$:Actions,private snapShotService:AtlasShellSnapshotService)
    {}
    effect$ = createEffect(
        ()=>this.actions$.pipe(ofType(EchoAction),
        tap(()=>atlas_log(this,"EFFECT TAP")),
        switchMap(()=>this.snapShotService.updateSnaphot$("echo","OK").pipe(
            switchMap(()=>[NA()])
        ))

    )
    )
}