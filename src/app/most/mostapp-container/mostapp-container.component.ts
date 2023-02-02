import { Component, ContentChild, ContentChildren, Input, OnInit, Query, QueryList } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';



import { Subject } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { entityTreeActiveIDLevelSelector } from '../../EntityTree.reducer';
import { MOSTComponentService } from '../mostcomponent.service';

import { MOSTContainerService } from '../mostcontainer.service';
import { MOSTSnapshotService } from '../mostsnapshot.service';
export const goBack = (activatedRoute:ActivatedRoute ,level:number):any=>
{
    if (activatedRoute.parent)
      console.log("ACTIVE  and Level",activatedRoute.snapshot.url,level);
    else{
      console.log("ACTIVE  unefined");
    }
    return level==0?activatedRoute:activatedRoute.parent?goBack(activatedRoute.parent,level-1):activatedRoute}
export const urlLevel=(url:string)=>url=="/"?0:url.replace("//","").split("/").length-1

@Component({
  selector: 'most-app-container',
  templateUrl: './mostapp-container.component.html',
  styleUrls: ['./mostapp-container.component.css'],
  providers:[MOSTContainerService]
})
export class MOSTAppContainerComponent implements OnInit {
  @ContentChildren(RouterOutlet) outlets!:QueryList<RouterOutlet>
  @Input() selectors:any = {}
  @Input() name = ""
  constructor(private mostContainerService:MOSTContainerService,private mostSnapshotService:MOSTSnapshotService,private store:Store<any>) {
  
   }

  ngOnInit(): void {
  }
  
  ngAfterContentInit(){
    let selectors:any = this.outlets.reduce((acc,outlet)=>{return {...acc,[(outlet as any).name]:entityTreeActiveIDLevelSelector("profile",urlLevel(this.mostContainerService.URL)+1,(outlet as any).name)}},{})
    console.log("SELECTORS",selectors)
    console.log("SELCETORS:",this.selectors)
    for (let outlet of this.outlets){
      let selector = selectors[(outlet as any).name]
      this.store.select(selector)
      .pipe(
          map(path=>[(outlet as any).name,path]),
          map(([name,path])=>{return (!path||!path[name])?[name,{[name]:"EMPTY"}]:[name,path]}),
          filter((([name,path])=>this.mostContainerService.currentPath[name]!=path[name])),
          map(([name,path])=>path)
          )
      .subscribe(
        (path)=>
        {
            this.mostSnapshotService.saveSnapshot()
            this.mostContainerService.NavTo2(path)
        
        })
    
    }
  }
    
 
  
}


