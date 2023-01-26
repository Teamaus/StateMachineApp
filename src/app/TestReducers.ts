import { state } from "@angular/animations";
import { createReducer,createAction, on, props } from "@ngrx/store";

export const A1 = createAction("A1",props<{A1:string}>())
export const A2 = createAction("A2",props<{A2:string}>())
export const A1A2=createAction("A1A2")
export const T1Reducer = createReducer(
    {},
    on(A1,(state,payload)=>{return {...state,A1:payload.A1}}),
    
)

export const T2Reducer = createReducer(
    {},
    on(A2,(state,payload)=>{return {...state,A2:payload.A2}}),
    
)


