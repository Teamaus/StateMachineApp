import { Component, ContentChild, ContentChildren, Input, OnInit, Query, QueryList } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { selector } from 'd3';
import { Subject } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { entityTreeActiveIDLevelSelector } from '../../EntityTree.reducer';
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
  styleUrls: ['./mostapp-container.component.css']
})
export class MOSTAppContainerComponent implements OnInit {
  @ContentChildren(RouterOutlet) outlets!:QueryList<RouterOutlet>
  @Input() selectors:any = {}
  @Input() name = ""
  currentPath:any = {}
  URL = this.router.url
  canNav = true
  activeID$= this.store.select(entityTreeActiveIDLevelSelector("profile",urlLevel(this.URL),"profile"))
  subject = new Subject()
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private store:Store<any>) {
    console.log(this.name+":MOSTAPPURL=>>>",this.URL,this.router.url)
   }

  ngOnInit(): void {
      this.router.events.subscribe(
        event=>{
          this.canNav = event instanceof NavigationEnd
          console.log("ROUTE EVENT:",event)
          if (this.canNav){
            this.subject.next()
          }
        }
      )
  }
  NavTo(path:any){
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
      this.subject.pipe(take(1))
      .subscribe(()=>this.NavTo2(path))
    }
  }
  ngAfterContentInit(){
    for (let outlet of this.outlets){
      let obj:any = outlet 
       this.selectors = {...this.selectors,[obj.name]:entityTreeActiveIDLevelSelector("profile",urlLevel(this.URL)+1,obj.name)} 

       
    }
    console.log("SELCETORS:",this.selectors)
    for (let outlet of this.outlets){
      let selector = this.selectors[(outlet as any).name]
      this.store.select(selector)
      .pipe(
          map(path=>[(outlet as any).name,path]),
          map(([name,path])=>{return (!path||!path[name])?[name,{[name]:"EMPTY"}]:[name,path]}),
          filter((([name,path])=>this.currentPath[name]!=path[name])),
          map(([name,path])=>path)
          )
      .subscribe(
        (path)=>
        {
         
          this.NavTo2(path)
        
        })
      }
    
  }
    //console.log(this.name+":SELECTORS=>>>",this.selectors)
 
  
}


