import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ADD_SNAPSHOT, entityTreeActivePathSelector, REMOVE_SNAPSHOT } from '../EntityTree.reducer';
import { MOSTSnapshotService } from '../most/mostsnapshot.service';
import { getPathFromPathObj } from './mostapp.utils';

@Injectable()
export class MOSTComponentService {
  snapShotRegistry:{[key:string]:any}={}
  path = []
  constructor(private store:Store<any>,private snapshotService:MOSTSnapshotService) { 
    this.store.select(entityTreeActivePathSelector("profile"))
    .subscribe(path=>this.path=path )
  }
  registerSnapshot(key:string,obj:any,valueFunc:(obj:any)=>any){
  
   let path = getPathFromPathObj(this.path)
   this.snapshotService.registerSnapshotEntry({path:path,obj:obj,valueObjFunc:valueFunc}) 
     
   }
  
  createForm(key:string,controls:{[key:string]:AbstractControl}){
    
    let retval =  new FormGroup(controls)
    this.registerSnapshot(key,retval,(retval)=>retval.value)
    return retval 
  }
  saveSnapShot(){
      
     this.snapshotService.saveSnapshot()
  }
  removeSnapShot(){
    
    this.store.dispatch(REMOVE_SNAPSHOT({path:this.path}))
  }
}
