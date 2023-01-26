import { state } from "@angular/animations";
import { FormControl } from "@angular/forms";
import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import { ExtendedEntityState } from "atlas-redux";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { Context, createContextAdapter } from "./context.model";
import { TREE_ADDENTITY, TREE_SETACTIVE } from "./EntityTree.reducer";
import { ShellContext } from "./shell-context.service";
import { createCompositeAction } from "./StateMachine.reducer";
const getContextID = (payload:any)=>payload.path[0]?payload.path[0]:payload.entity.id
export const SETSHELLCONTEXT = createAction("UPDATESHELLCONTEXT",props<{id:string,path:string[],category:string}>())
export const SETSHELLACTIVECONTEXT = createAction("SETACTIVECONTEXT",props<{id:string}>())
export const ADDOPERATION = (payload:any)=>createCompositeAction("ADDOPERATION",TREE_ADDENTITY(payload),TREE_SETACTIVE({path:payload.path,id:payload.entity.id}))
export const activeContextSelector  =  createSelector(
    createFeatureSelector("context"),
    (state:any)=>state?state.activeID!=''?state[state.activeID]:undefined:state
)

export function getCurrentContext$():Subject<ShellContext>{
    let retval = new BehaviorSubject({id:"1"})
    return retval
}
export const contextAdapter = createContextAdapter()

export const contextReducer = createReducer(
    contextAdapter.getInitialContext("operations","operations"),
    on(SETSHELLCONTEXT,(state:any,payload:any)=>{console.log(payload.path);return {...state,[getContextID(payload)]:[...payload.path,payload.entity.id]}}),
    on(SETSHELLACTIVECONTEXT,(state:any,payload:any)=>{return {...state,activeID:payload.id}})
    

)


