import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';


import {entityTreeActivePathSelector, entityTreeActiveSnapShotSelector, REMOVE_SNAPSHOT } from '../EntityTree.reducer';

import { atlas_log, getPathFromPathObj } from 'atlas-utils';
import { AtlasShellSnapshotService } from 'atlas-shell-logic';





@Injectable()
export class MOSTComponentService {
  snapShotRegistry:{[key:string]:any}={}
  path = []
  snapShot:any
 
  compName:string='NONAME'
  constructor(private store:Store<any>,private snapshotService:AtlasShellSnapshotService,private activatedRoute:ActivatedRoute) { 
    
    
  }
  registerSnapshot(key:string,obj:any,valueFunc:(obj:any)=>any){
  
   let path = getPathFromPathObj(this.path)
   return  this.snapshotService.registerSnapshotEntry({path:path,obj:obj,valueObjFunc:valueFunc,outlet:this.activatedRoute.outlet,compName:this.compName}) 
   
   }
  
  createForm(key:string,controls:{[key:string]:AbstractControl}){
    
    let retval =  new FormGroup(controls)
    this.store.select(entityTreeActivePathSelector("profile"))
    .subscribe(path=>{this.path=path;console.log("PATH",this.path)}) 
    this.store.select(entityTreeActiveSnapShotSelector("profile",this.activatedRoute.outlet))
    
    .subscribe(snapShot=>{
          atlas_log(this,"UPDATE SNAPSHOT:=>>>",this.snapShot,snapShot,this.activatedRoute.outlet)
          if (snapShot)
            retval.setValue(snapShot)
    },
    (error)=>console.log("Error"),()=>console.log()
    )
   
    if (this.snapShot){
      atlas_log(this,"SNAPSHOT:=>>>",this.snapShot)
      retval.setValue(this.snapShot)
    }
    else{
      console.log("NO SNAPSHOT:=>>>")
    }
    this.registerSnapshot(key,retval,(retval)=>retval.value)
    ///if we have values in the snapshot lets bring them
    
    //ToDo here 
    return retval 
  }
  select$(obs$:Observable<any>){
      return obs$
      
  }

}
