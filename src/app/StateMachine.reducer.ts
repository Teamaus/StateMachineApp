import { state } from "@angular/animations"
import { Action, ActionCreator, ActionReducer, createAction, createReducer, MetaReducer, on, props, ReducerManagerDispatcher } from "@ngrx/store"

import {getObj, makeObj, MappingStateFunc} from 'atlas-redux'
import { reduce } from "d3"

export interface ITransition{
    [key:string]:{[key:string]:string}
}

export function ons(t:ITransition){
    return Object.keys(t).map(s=>Object.keys(t[s]).map(a=>on(createAction(a),(state:any)=>t[state][a])))
    
}
export function  StateMachineReducer (slice:string,transition:ITransition,initialState:any)
{
    let retval = createReducer(
        initialState,
        ...ons(transition).reduce((acc,o)=>acc.concat(o))
    )
    
       return createReducer(
            initialState,
            ...ons(transition).reduce((acc,o)=>acc.concat(o))
       )
}

export const  A = createAction("A",props<{ID:string}>())

export const  metaReducer = (reducer:ActionReducer<any>)=>{
    console.log(reducer.name)
    return (state:any,action:any)=>{
        console.log(reducer.prototype)        
      if (state)
      {
        console.log("METAWITH KIKI",state)

        let retval = reducer({},action)
        console.log("RETVAL",retval)
        
        return retval 
         
        
      } 
      else
      {
        console.log("Init State")
        return reducer(state,action)
      }
  }
}
export const  compositeActionMetaReducer = (reducer:ActionReducer<any>)=>{
    return (state:any,action:any)=>{
      
      
      if (!isCompositeAction(action))
      {
          console.log("META ACTION NOT COMPOSITE",action)
          return reducer(state,action)
      }
      else
      {
       
       
        console.log("META ACTIONS",(action as CompositeAction).actions)
        let retval =  (action as CompositeAction).actions.reduce((acc,action)=>reducer(acc,action),state)
        /*let retval = state
        for (let act of (action as CompositeAction).actions)
          {
              console.log("ACTION=>>",act)
              retval = reducer(retval,act)
          }*/
          return retval 
    }
  }
}
export const  metaReducers:MetaReducer[] = [compositeActionMetaReducer]
export function getSearchPath(state:any):any{
  let id = state.searchId
  let found = false 
  let path =  (mappedState:any)=>{
    let retval:any = [] 
    if (!id ||id==''){
      retval = []
    }
    else
    {
        if (mappedState.entities[id]){
              retval = ['entities',id]
              found = true 
        }
        else{
            for (let pid in mappedState.entities){
              retval = ['entities',pid,...path(mappedState.entities[pid])]
              if (found){
                break; 
              }

            }
        }
    }
      return retval 
  }
  let m_retval = path(state)
  return found?m_retval:[]
  
}
export function getActivePath(state:any):any{
    
    let path = (state:any)=>{
      let id = state.activeId
    let retval:any = []
    if (id==''){
      retval = []
    }
    else
    {
     /* if (!isEntity(state.entities[id])){
          console.log("NOT ENTITY",state.entities[id])
          retval = ['entities',id]      
      }
      else*/{
        console.log("RECURSE")
        retval =  ['entities',id,...path(state["entities"][id])]
        console.log("RETVAL",retval)
      }
      
    }
    return retval  
    }
    
   
   
  
  return path(state) 
 
}


export const  mappedReducer = (reducer:ActionReducer<any>,mappingFunc:MappingStateFunc<any>)=>{
  return (state:any,action:any)=>{
        if (state){

          
          let f = mappingFunc(state,undefined)
          
          let mappedState =  reducer(getObj(state,f),action)

          
          
          let retval = makeObj(state,state,mappedState,f)

          
          return retval 
          }
          else{
            console.log("MAPPED",state,action)
            return reducer(state,action)
          }
  }
}
interface  ENTITY {activeId:string,entities:any}
const emptyEntity:()=>ENTITY = ()=>{return {activeId:'',entities:{}}}
const initialState:ENTITY = emptyEntity()
const isActive = (entity:ENTITY)=>entity.activeId!=''
const isEmpty = (obj:any)=>Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype
const isEntity =(obj:any):obj is ENTITY=>(obj as ENTITY).activeId !=undefined 

export const B = createAction("B",props<{ID:string}>())

export const C = createAction("C",props<{IDS:string[]}>())
export const D = createAction("D")
export const S = createAction("S",props<{ID:string}>())
export const F = createAction("F")
export const  myReducer = createReducer(
 initialState,
  on(A,(state,payload)=>{console.log("MYREDUCER",state,A.name);return {...state,entities:{...state.entities,[payload.ID]:initialState},activeId:payload.ID}}),
  on(D,(state)=>{return {...state,activeId:''}})
)


export const bReducer = createReducer(
  {activeId:""},
  on(B,(state,payload)=>{return {...state,activeId:payload.ID}}),
  on(S,(state,payload)=>{{return {...state,searchId:payload.ID}}})
  
  
)
export interface CompositeAction extends Action{
  type: string
  actions:Action[]



}

export function isCompositeAction(obj:any):obj is CompositeAction
{
  
  return (obj.type!=undefined && obj.actions!=undefined)
}
export function createCompositeAction(actionName:string,...actions:Action[]){
  console.log("COMPOSITE ACTION NAME",actionName)
  return {type:actionName,actions:actions}
}






