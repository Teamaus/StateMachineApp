import { state } from "@angular/animations";
import { createAction, createReducer, on, props } from "@ngrx/store";

export const STEP = createAction("STEP",props<{step:string}>())
export const STEPINFO = createAction("STEPINFO",props<{step:string}>())
export const op650Reducer = createReducer(
    {
        step:'',
        stepInfo:''
        
    },
    on(STEP,(state:any,payload:{step:string})=>{return {...state,step:payload.step}}),
    on(STEPINFO,(state,payload:{step:string})=>{return {...state,stepInfo:payload.step}})

)