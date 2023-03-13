import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';



import { Subject } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

import { entityTreeActiveIDLevelSelector } from '../../EntityTree.reducer';


import { MOSTContainerService } from '../mostcontainer.service';
import { MOSTSnapshotService } from '../mostsnapshot.service';
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
    for (let outlet of this.outlets){
      let selector = selectors[(outlet as any).name]
      this.store.select(selector)
      .pipe(
          tap(path=>console.log("PATH=>",path)),
          map(path=>[(outlet as any).name,path]),
          map(([name,path])=>{return (!path||!path[name])?[name,{[name]:"EMPTY"}]:[name,path]}),
          filter((([name,path])=>this.mostContainerService.currentPath[name]!=path[name])),
          map(([name,path])=>path)
          )
      .subscribe(
        (path)=>
        {
          //We will move this to the effect set active 
          
          //  this.mostSnapshotService.saveSnapshot()
            //********
            console.log("SELECTORS NAV",path)
            this.mostContainerService.NavTo2(path)
        
        })
    
    }
  }
    
 
  
}


