import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";

import { getObj } from "atlas-redux";
import { TreeEntityAdapter } from "./EntityTree.model";
export const treeEntityAdapter = new TreeEntityAdapter()
export const TREE_ADDENTITY = createAction("TREE_ADDENTITY",props<any>())
export const TREE_SETACTIVE = createAction("TREESETACTIVE",props<any>())
export const TREE_NOACTION = createAction("NOACTION")
export const entityTreeReducer = createReducer(
   treeEntityAdapter.adapter.getInitialState(),
   on(TREE_ADDENTITY,(state,payload)=>{
                                        let retval = treeEntityAdapter.addEntity(state,payload.path,payload.entity)
                                        console.log("TREE ADD ENT",retval )
                                        return retval 
   }),
   on(TREE_SETACTIVE,(state,payload)=>treeEntityAdapter.setActive(state,payload.path,payload.id)),
   on(TREE_NOACTION,(state)=>{return {...state}})


   
    
)

export const entityTreePathSelector = (slice:string,id:string,path:string[])=>
        createSelector(
            createFeatureSelector(slice),
            (state:any)=>treeEntityAdapter.findEntityPath(state,[...path,id])
        )
        

export const entityTreeIDSelector = (slice:string,id:string)=>createSelector(
     createFeatureSelector(slice),
    (state:any)=>treeEntityAdapter.findEntity(state,id))
export const entityTreeActivePathSelector= (slice:string)=>
createSelector(
    createFeatureSelector(slice),
    (state:any)=>treeEntityAdapter.getActivePath(state)
)
export const contextIDSelector = createSelector(
    createFeatureSelector("profile"),
    (state:any)=>state.activeID.profileID
)
export const entityTreeActiveIDLevelSelector= (slice:string,level:number,category:string)=>
createSelector(
    createFeatureSelector(slice),
   
    (state:any)=>treeEntityAdapter.getActiveID(state,level,category)
)



    




