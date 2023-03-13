import { ActionCreator, ActionCreatorProps, createAction, props } from "@ngrx/store";
export const MOSTShell_EntityAction_Names={
    ADD_ENTITY:"ADD_ENTITY",
    ACTIVATE_ENTITY:"ACTIVATE_ENTITY"
}
export interface MOSTShell_EntityActions{
    ADD_ENTITY:ActionCreator<string,any>,
    ACTIVATE_ENTITY:ActionCreator<string,any>

    
}
export interface MOSTShell_SnapshotActions{
    ADD_SNAPSHOT:ActionCreator<any>,
    REMOVE_SNAPSHOT:ActionCreator<any>
}

export const MOST_createActions =<T>(obj:{
    source:string,
    events:{[key:string]:ActionCreatorProps<any>}
})=>{
        let retval = Object.keys(obj.events)
        .reduce((acc:any,key:string)=>
        {return {...acc,[key]:createAction(key+"_"+obj.source,props<any>())}},createAction("EMPTY"))
       
        return retval as T

    }
export const MOST_createShellEntityAction = (source:string)=>
MOST_createActions
({source:source,
 events:{ADD_ENTITY:props<any>(),
        ACTIVATE_ENTITY:props<any>()}
}) as MOSTShell_EntityActions

 

export const MOST_createShellSnapshot = (source:string)=>MOST_createActions
({source:source,
 events:{ADD_SNAPSHOT:props<any>(),
        REMOVE_SNAPSHOT:props<any>()}
}) as MOSTShell_SnapshotActions




