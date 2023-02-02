import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { entityTreeActivePathSelector } from './EntityTree.reducer';

@Injectable()
export class NavigationService {
  operationPath = []
  snapShot:any
  constructor(private router:Router,private activateRoute:ActivatedRoute
    ,private store:Store<any>) 
  {
        this.store.select(entityTreeActivePathSelector("profile"))
        .subscribe(
          path=>this.operationPath = path
        )
  }
  registerSnapShot(obj:any){
      //here we will put the snapshot registration 
      //when we navigate we take the obj and send it to snapshot 
      this.snapShot = obj

  }
  
}
