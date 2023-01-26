import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { getCurrentContext$ } from './context.reducer';

export interface Operation{
  id:string,
  outlet:string,
  operation:Operation[]
}
export interface ShellContext{
  id:string,
  activeOperationPath?:string[]
  operation?:Operation[]
    
}
function EmptyContext():ShellContext{
  return {id:'',operation:[],activeOperationPath:[]}
}
function EmptyOperation():Operation{
    return {id:'',operation:[],outlet:''}
}
export function getObj(operation:Operation[], operationID:string):Operation{
    let retval:Operation = EmptyOperation()
    
    for (let op of operation){
      if (op.id == operationID){
          console.log("FOUND!!!")
          retval = op
          break; 
      }
      else 
      {
          retval = getObj(op.operation,operationID)
      }
    }
    console.log("FOUND",retval)
    return retval 
}
@Injectable({
  providedIn: 'root'
})
export class ShellContextService {
  context: ShellContext = EmptyContext() 
  constructor() {
      getCurrentContext$().subscribe(
        context=>this.context=context
      )
  }
   
   addNewOperation(operation:Operation,parentOperationID:string)
   {

        let retval  = {...this.context}
        if (retval.operation){
        let obj = parentOperationID==''?this.context:getObj(retval.operation,parentOperationID)
        if (obj.operation)
          obj.operation = [...obj.operation,operation]
        }
        
        return retval
   }
   
   
}
