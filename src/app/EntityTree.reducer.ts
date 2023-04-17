import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";

import { TreeEntityAdapter } from "./EntityTree.model";
import { MOST_createShellEntityAction, MOST_createShellSnapshot } from "./MOSTShell.actions";
export const treeEntityAdapter = new TreeEntityAdapter()
export const TREE_ADDENTITY = (slice:string)=>createAction(slice+"_TREE_ADDENTITY",props<any>())
export const TREE_SETACTIVE = (slice:string)=>createAction(slice+"_TREESETACTIVE",props<any>())
export const TREE_NOACTION = (slice:string)=>createAction(slice+"_NOACTION")
export const ADD_SNAPSHOT= (slice:string)=>createAction(slice+"_ADD_SNAPSHOT",props<any>())
export const REMOVE_SNAPSHOT = (slice:string)=>createAction("REMOVE_SNAPSHOT",props<any>())

export const entityTreeReducer =(slice:string)=> createReducer(
    treeEntityAdapter.adapter.getInitialState(),
    on(TREE_ADDENTITY(slice),(state,payload)=>{
                                         let retval = treeEntityAdapter.addEntity(state,payload.path,payload.entity)
                                         
                                         return retval 
    }),
    on(TREE_SETACTIVE(slice),(state,payload)=>{console.log("SET ACTIVE PAYLOAD",payload); return treeEntityAdapter.setActive(state,payload.path,payload.id)}),
    on(TREE_NOACTION(slice),(state)=>{return {...state}}),
    on(ADD_SNAPSHOT(slice),(state,payload:any)=>treeEntityAdapter.addSnapShot(state,payload.path,payload.snapshot)),
    on(REMOVE_SNAPSHOT(slice),(state,payload:any)=>treeEntityAdapter.removeSnapShot(state,payload.path))
 
 
    
     
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

export const entityTreeActiveSnapShotSelector=(slice:string,outlet:string)=>
createSelector(
    createFeatureSelector(slice),
    
    (state:any)=>treeEntityAdapter.getActiveEntity(state,outlet).snapShot
)

export const entitiesTreeSelector = (slice:string,path:string[],entitiesCategory='')=>createSelector(
    createFeatureSelector(slice),
    (state:any)=>treeEntityAdapter.getEntities(state,path,entitiesCategory)
)

export const entitiesByActiveCategorySelector = (slice:string,category:string)=>createSelector(
    createFeatureSelector(slice),
    (state:any)=>treeEntityAdapter.getActiveEntity(state,category)
)

export const pathByActiveCategorySelector = (slice:string,category:string)=>createSelector(
    createFeatureSelector(slice),
    (state:any)=>treeEntityAdapter.getActivCategoryPath(state,category)
)


export const entitiesByActiveCategoryPathSelector = (slice:string,categoryPath:string[])=>createSelector(
    createFeatureSelector(slice),
    (state:any)=>treeEntityAdapter.getActiveEntityByPath(state,categoryPath)
)









    




