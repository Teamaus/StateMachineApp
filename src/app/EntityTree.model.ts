

import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity"




import { most_log } from "./most/most.log"

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
    setObjValue(state:EntityState<any>,path:string[],objFunc:(inState:any)=>any)
    {

        let retval:any  = {...state}
         if (retval)
         {
                if (path.length == 0 ){
                        if(!retval.entities) 
                            retval = {...retval,...this.adapter.getInitialState()}
                        
                        retval = objFunc(retval)
                    }
                    else{
                        if (retval.entities)
                        {
                            let [first,...rest] = path  
                            retval = {...retval,
                            entities:
                                {...retval.entities,
                                    [first]:this.setObjValue(retval.entities[first],rest,objFunc)
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
                return this.setObjValue(state,path,(retval)=>this.adapter.addOne({...entity,path:entityPath},retval))
             }
             
            return f(state,path) 
    }
    getEntitiesByCategory(state:EntityState<any>,categoryPath:string[]):any
    {
        let obj:any = state
        if (!obj)
            return obj
        let active = obj.activeID
        let [first,...rest]=categoryPath
        if (rest.length==0){
            if (obj.active[first])
            return state.entities[first].entities
        }
        return this.getEntitiesByCategory(state.entities[first],rest)
    }
         

    
    setActive(state:EntityState<any>,path:string[],id:string){
             let entity = this.getEntity(state,[...path,id])
             console.log("ENTITY FOUND",entity,id,path)
             let f=(state:EntityState<any>,path:any)=>
             {
                
                return this.setObjValue(state,path,(retval)=>{return {...retval,activeID:{...retval.activeID,[entity.category]:entity.id}}})
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
    getEntities2(state:EntityState<any>,activeEntity:any,entitiesCategory='')
    {
        most_log(this.getEntities2,"ACTIVE ENTITY",activeEntity)
        let path = [...activeEntity.path]
      
        if (activeEntity.category!=entitiesCategory){
            path = [activeEntity.id,...path]    

        }
        
        most_log(this.getEntities2,"PATH=>>>",path,activeEntity.category,entitiesCategory)
        return this.getEntities(state,path,entitiesCategory)
    }
    getEntities(state:EntityState<any>,path:string[],entitiesCategory=''):any{
        
        let filterEntities=(entities:any,category:any)=>
            Object.keys(entities).filter((key:any)=>entities[key].category==category)
            .reduce((acc:any,id)=>{return {...acc,[id]:entities[id]}},{})
        console.log("GET ENTITIES",state,path,"ent Category:",entitiesCategory)
        if (!path  ||path.length==0){
            if (state)
            {
                if (entitiesCategory=='')
                {
                    most_log(this,"CATEGORY NO CATEGORY")
                    return state.entities
                }
                else
                {
                    most_log(this,"CATEGORY:",entitiesCategory)
                    return filterEntities(state.entities,entitiesCategory)
                    
                }
            
                    
            }
            else
                return state
        }
        let [first,...rest] = path
        console.log("FIRST=>>>",first)
        return this.getEntities(state.entities[first],rest,entitiesCategory)
    }
    getActivCategoryPath(state:EntityState<any>,category:string){
        let obj:any = state
        if (obj && obj.activeID){
            if (obj.activeID[category]){
                return [category]
            }
            else{
                for (let cat in obj.activeID){
                    let retval:any = this.getActivCategoryPath(obj.entities[obj.activeID[cat]],category)
                    if (retval)
                        return [cat,...retval]
                    else
                        return retval
                }
            }
        }
        else{
            return undefined
        }
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
    getActiveEntityByPath(state:EntityState<any>,path:string[]){
            let obj:any=state
            let retval:any = undefined 
            if (path.length==0)
            {
                most_log(this,"RETVAL==>>0 getActiveEntityByPath:",obj)
                return obj
            }
            
            if (obj && obj.activeID){
                let [first,...rest] = path
                if (obj.activeID[first]){
                    retval= this.getActiveEntityByPath(obj.entities[obj.activeID[first]],rest)
                }
               

            }
            most_log(this,"RETVAL getActiveEntityByPath:",retval)
            return retval
            
    }
    getActiveEntity(state:EntityState<any>,outlet:string){
        let obj:any = state 
        let retval:any = {}
        if (obj && obj.activeID){
            for (let category in obj.activeID){
                
                if (category==outlet){
                        retval = obj.entities[obj.activeID[category]]
                    break;
                }
                else{
                  
                    retval = this.getActiveEntity(obj.entities[obj.activeID[category]],outlet)
                }
            }
            
        
        }
        most_log(this.getActiveEntity,"RETVAL",retval,"OUTLET:",outlet)
        return retval 
        
    }
    getActiveID(state:EntityState<any>,level:number,category:string):any{
        let obj:any = state
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
        let f=(state:EntityState<any>,path:any)=>
            this.setObjValue(state,path,
            (inState)=>{return {...inState,snapShot:snapShot}})
        return f(state,path) 
    }
    removeSnapShot(state:EntityState<any>,path:string[]){
        let f=(state:EntityState<any>,path:any)=>this.setObjValue(state,path,(inState)=>{let {snapShot,...retval}=inState;return retval})     
        return f(state,path)
    }




    

}


