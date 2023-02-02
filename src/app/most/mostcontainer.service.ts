import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { goBack, urlLevel } from './mostapp.utils';

@Injectable()
export class MOSTContainerService {
  currentPath:{[key:string]:string}={}
  private canNav = true
  URL:string = this.router.url
  private syncNavSubject = new Subject()
  private subscribeRouter(router:Router){
    router.events.pipe(
    filter(event=>event instanceof NavigationEnd || event instanceof NavigationCancel )
  ).
  subscribe(
    event=>{
      this.canNav = true
      this.syncNavSubject.next()
      
    }
  )
  this.router.events.pipe(
    filter(event=>event instanceof NavigationStart)
  ).
  subscribe(
    event=>{
      this.canNav = false
      
      
    }
  )
}

private NavTo(path:any){
  if (this.URL==this.router.url)
  {
    this.router.navigate([{outlets:path}],{relativeTo:this.activatedRoute})
  }
  else{
      this.router.navigate([{outlets:path}],{relativeTo:goBack(this.activatedRoute,urlLevel(this.URL))})
  }
  let key = Object.keys(path)[0]
  this.currentPath[key]=path[key]

}
NavTo2(path:any){
  if (this.canNav){
    this.NavTo(path)
  }
  else{
    this.syncNavSubject.pipe(take(1))
    .subscribe(()=>this.NavTo2(path))
  }
}

constructor(private router:Router,private activatedRoute:ActivatedRoute) 
{
      this.subscribeRouter(router)

}
 
}
