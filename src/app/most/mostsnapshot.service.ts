import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ADD_SNAPSHOT } from '../EntityTree.reducer';
import { createCompositeAction } from '../StateMachine.reducer';
export interface SnapshotEntry{
  path:string[],
  obj:any,
  valueObjFunc:(obj:any)=>any

}
@Injectable({
  providedIn: 'root'
})
export class MOSTSnapshotService {

  snapShotRegistry:SnapshotEntry[] = []

  constructor(private store:Store<any>) { }
  registerSnapshotEntry(snapshotEntry:SnapshotEntry){
    this.snapShotRegistry =  [...this.snapShotRegistry,snapshotEntry]
    return this.registerSnapshotEntry

  }
  saveSnapshot(){
    let actions = this.snapShotRegistry.map(snapshotEntry=>
      ADD_SNAPSHOT({path:snapshotEntry.path,snapshot:snapshotEntry.valueObjFunc(snapshotEntry.obj)}))
    let action = createCompositeAction("SNAPSHOTS",...actions)
    this.store.dispatch(action)
    this.snapShotRegistry = [] //clear registry 
  }
  
}
