import { state } from "@angular/animations"
import { reportInvalidActions } from "@ngrx/effects/src/effect_notification"
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity"
import { entityActions, getAdapterSelectors } from "atlas-redux"
import { tree } from "d3"
import { find } from "rxjs/operators"
import { Context, ContextAdapter, createContextAdapter } from "./context.model"

export interface EntityTree<T extends {id:string,path:string}>{

    
    entityState:EntityState<T>,
    entities:EntityTree<T>[]
}
export function getMappedState(state:EntityState<any>,path:string[],adapter:EntityAdapter<any>){
    let retval  = {...state}
    if (path.length>0)
    {
            let [first,...rest] = path  
            retval = {...retval,
            entities:
                {...(retval.entities?retval.entities:adapter.getInitialState().entities),
                    [first]:getMappedState(retval.entities[first],rest,adapter)
                }}
    }
    return retval 
        

}
export class TreeEntityAdapter{
    activePath:string[]=[]
    adapter:EntityAdapter<any> = createEntityAdapter()
    state:EntityState<any> = this.adapter.getInitialState()
    constructor(){

    }
    findEntity(state:EntityState<any>,id:string){
            console.log("FIND ENTITY STATE",state)
            let retval :any = state
            if (!state.entities){
                retval =  undefined
            } 
            else
            if (state.entities[id]){
                retval = state.entities[id]
            }
            else{
                for (var l_id in state.entities){
                    retval = this.findEntity(state.entities[l_id],id)
                }
            }
            return retval 
    }

    findEntityPath(state:EntityState<any>,path:string[]){
            let retval :any = state
           // console.log("FINDENTITYPATH",state,"PATH",path)
            if (retval){
                if (path.length>0){
                    let [first,...rest] = path
                    retval = undefined
                    if (state.entities)
                        if (state.entities[first])
                            retval = this.findEntityPath(state.entities[first],rest)
                    
                }
                    


            }
            return retval 
                
                

    }
    getObj(state:EntityState<any>,path:string[],objFunc:(inState:any)=>any)
    {

        let retval:any  = {...state}
         if (retval)
         {
                if (path.length == 0 ){
                        if(!retval.entities) 
                            retval = {...retval,...this.adapter.getInitialState()}
                        console.log("RETVAL",retval)
                        retval = objFunc(retval)
                    }
                    else{
                        if (retval.entities)
                        {
                            let [first,...rest] = path  
                            retval = {...retval,
                            entities:
                                {...retval.entities,
                                    [first]:this.getObj(retval.entities[first],rest,objFunc)
                                }}
                        }
                        else{
                            retval = undefined
                        }
            }
         }

                        return retval 
    }
    addEntity(state:EntityState<any>,path:string[],entity:any){
             let entityPath = path 
             let f=(state:EntityState<any>,path:any)=>
             {
                return this.getObj(state,path,(retval)=>this.adapter.addOne({...entity,path:entityPath},retval))
             }
             
            return f(state,path) 
    }
    setActive(state:EntityState<any>,path:string[],id:string){
             let entity = this.getEntity(state,[...path,id])
             console.log("ENTITY FOUND",entity,id,path)
             let f=(state:EntityState<any>,path:any)=>
             {
                
                return this.getObj(state,path,(retval)=>{return {...retval,activeID:{...retval.activeID,[entity.category]:entity.id}}})
             }
             let retval = f(state,path) 
             
            return retval 
    }
    getEntity(state:EntityState<any>,path:string[]){
        let obj:any = state
        let retval:any = state
        if (path.length>0)
        {
            let [first,...rest] = path
            retval =  this.getEntity(obj.entities[first],rest)
        }
        return retval 
    }
    getActivePath(state:EntityState<any>):any{
        let obj:any = state
        let retval = {}
        if (obj && obj.activeID) 
        {
             
            for (let category in obj.activeID){
                 let id = obj.activeID[category]
                    retval = {...retval,[id]:this.getActivePath(obj.entities[id])}
            }
           
        }
        
        return retval 

    }

    getActiveID(state:EntityState<any>,level:number,category:string):any{
        let obj:any = state
        console.log("GETACTIVEID",obj,level)
        let retval = undefined
        if (level == 0 && obj &&obj.activeID ){
                    console.log("FOUND=>>>",category)   
                    retval = {[category]:obj.activeID[category]}
        }
        else
        if (obj && obj.activeID)
        {
            
            for (let cat in obj.activeID)
            {
                retval = this.getActiveID(obj.entities[obj.activeID[cat]],level-1,category)
            }
        }
        return retval 

    }
    

    
    


    addSnapShot(state:EntityState<any>,path:string[],snapShot:any){
        let f=(state:EntityState<any>,path:any)=>this.getObj(state,path,(inState)=>{return {...inState,snapShot:snapShot}})
     
        return f(state,path) 
    }
    removeSnapShot(state:EntityState<any>,path:string[]){
        let f=(state:EntityState<any>,path:any)=>this.getObj(state,path,(inState)=>{let {snapShot,...retval}=inState;return retval})     
        return f(state,path)
    }




    

}


