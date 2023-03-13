import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';

import { ADD_SNAPSHOT, entityTreeActivePathSelector, entityTreeActiveSnapShotSelector, REMOVE_SNAPSHOT } from '../EntityTree.reducer';
import { MOSTSnapshotService } from '../most/mostsnapshot.service';
import { most_log } from './most.log';
import { getPathFromPathObj } from './mostapp.utils';

@Injectable()
export class MOSTComponentService {
  snapShotRegistry:{[key:string]:any}={}
  path = []
  snapShot:any
  stop$ = new Subject<any>()
  compName:string='NONAME'
  constructor(private store:Store<any>,private snapshotService:MOSTSnapshotService,private activatedRoute:ActivatedRoute) { 
    this.stop$.subscribe(
      v=>most_log(this,"SUBSTOP$",this.path,this.compName)
    )
    this.store.select(entityTreeActivePathSelector("profile"))
    .subscribe(path=>{this.path=path;console.log("PATH",this.path)}) 
    this.store.select(entityTreeActiveSnapShotSelector("profile",this.activatedRoute.outlet))
    .pipe(take(1))
    .subscribe(snapShot=>{
          most_log(this,"UPDATE SNAPSHOT:=>>>",this.snapShot,snapShot,this.activatedRoute.outlet)
          this.snapShot=snapShot
    },
    (error)=>console.log("Error"),()=>console.log()
    )
    
    
  }
  registerSnapshot(key:string,obj:any,valueFunc:(obj:any)=>any){
  
   let path = getPathFromPathObj(this.path)
   return  this.snapshotService.registerSnapshotEntry({path:path,obj:obj,valueObjFunc:valueFunc,outlet:this.activatedRoute.outlet,stop$:this.stop$,compName:this.compName}) 
   
   }
  
  createForm(key:string,controls:{[key:string]:AbstractControl}){
    
    let retval =  new FormGroup(controls)
    if (this.snapShot){
      most_log(this,"SNAPSHOT:=>>>",this.snapShot)
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
      return obs$.pipe(
        tap(o=>most_log(this.select$,"SELECT$ BEFORE")),
        takeUntil(this.stop$),
        tap(o=>most_log(this.select$,"SELECT$ AFTER"))
      )
  }

}
