import { Injectable } from '@angular/core';
import { createAction, Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { ADD_SNAPSHOT } from '../EntityTree.reducer';
import { createCompositeAction } from '../StateMachine.reducer';
import { most_log } from './most.log';
export interface SnapshotEntry{
  path:string[],
  obj:any,
  stop$:Subject<any>
  valueObjFunc:(obj:any)=>any,
  outlet:string,
  compName:string

}
const NOACTION = createAction("NOACTION")
@Injectable({
  providedIn: 'root'
})
export class MOSTSnapshotService {

  snapShotRegistry:SnapshotEntry[] = []

  constructor(private store:Store<any>) { }
  registerSnapshotEntry(snapshotEntry:SnapshotEntry){
    console.log("SNAPSHOT ENTRY",snapshotEntry)
    
    this.snapShotRegistry =  [...this.snapShotRegistry,snapshotEntry]
    return this.registerSnapshotEntry

  }
  saveSnapshot(slice:string){
    let actions = this.snapShotRegistry.map(snapshotEntry=>
      ADD_SNAPSHOT(slice)({path:snapshotEntry.path,snapshot:snapshotEntry.valueObjFunc(snapshotEntry.obj)}))
    let action = createCompositeAction("SNAPSHOTS",...actions)
    
    this.snapShotRegistry = [] //clear registry 
    this.store.dispatch(action)
  }
  saveSnapshot$(slice:string):Observable<any>
  {
    //console.log("SNAPSHOT REGISTRY",this.snapShotRegistry)
    let actions = this.snapShotRegistry.map(snapshotEntry=>
      {
        console.log("SNAPSHOT REGISTRY$",snapshotEntry)
      snapshotEntry.stop$.next(snapshotEntry.outlet)  
      return ADD_SNAPSHOT(slice)({path:snapshotEntry.path,snapshot:snapshotEntry.valueObjFunc(snapshotEntry.obj)})
      }
    )
      
    let compositeAction = createCompositeAction("SNAPSHOTS",...actions)
    console.log("SAVE SNAPSHOT$",compositeAction.actions)
    this.snapShotRegistry = [] //clear registry 
    
    if (compositeAction.actions.length==0){
      most_log(this,"NOACTION")
      return of(NOACTION())
    }
    
    return of(...compositeAction.actions)

  }
  
}
