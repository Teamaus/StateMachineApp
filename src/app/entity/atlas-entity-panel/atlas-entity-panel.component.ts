import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { entitiesByActiveCategorySelector, entitiesTreeSelector, entityTreeActiveIDLevelSelector, treeEntityAdapter } from 'src/app/EntityTree.reducer';
import { most_log } from 'src/app/most/most.log';
import { MOSTComponentService } from 'src/app/most/mostcomponent.service';
import { MOST_createShellEntityAction } from 'src/app/MOSTShell.actions';


@Component({
  selector: 'atlas-entity-panel',
  templateUrl: './atlas-entity-panel.component.html',
  styleUrls: ['./atlas-entity-panel.component.css']
})
export class AtlasEntityPanelComponent implements OnInit {
  @Input() path:string[]=[]
  @Input() slice =''
  @Input() category=''
  @Input() entitiesCategory = ''
  destroy$ = new Subject()
  keys$ :any
  activeID$:any
  entities:string[] = []
  @Output() addEntities:EventEmitter<boolean> = new EventEmitter<boolean>()
  constructor(private store:Store<any>,private componentService:MOSTComponentService) {
        most_log(this,"COMPNAME:",this.componentService.compName)
   }

  ngOnInit(): void {
    let selector = createSelector(
      createFeatureSelector(this.slice),
      entitiesByActiveCategorySelector(this.slice,this.category),
      (state:any,activeID:any)=>
      {
        most_log(this,"AAA CATEGORY",this.category)
        most_log(this,"AAA SelectorFunc",activeID,"STATE:",state)
        most_log(this,"=>>>PATH",activeID.path,this.category)
        most_log(this,"AAA Selector entities=>>>",treeEntityAdapter.getEntities(state,activeID.path,this.category))
        this.path = activeID.path
        return (activeID.path)?treeEntityAdapter.getEntities(state,activeID.path,this.category):undefined
      }
      
    
    )
    let selector2  = createSelector(
      
      entitiesByActiveCategorySelector(this.slice,this.category),
      (activeID:any)=>activeID.path
    )
   
   this.store.select(selector2).subscribe(path=>this.path=path)
    
    this.keys$ = this.store.select(selector)
    .pipe(map(entities=>Object.keys(entities?entities:{})))
    this.keys$.subscribe((a:any)=>most_log(this,"AAA=>>>",a))
    //this.keys$.pipe(take(1))
    most_log(this,"SELECT$ SUBSCRIBE")
    let one$ = new Subject()
    this.componentService.stop$.subscribe(v=>console.log("SUBSTOP$ NEXT COMPLETED",v))
   let obs$ = this.keys$.pipe(takeUntil(one$),
   takeUntil(this.destroy$))
    obs$.subscribe(
        (a:any)=>
        {
          most_log( this,"EMIT",a)
          
          if (a.length==0)
            this.addEntities.emit(true)
        },
        ()=>console.log("ERR"),
        ()=>console.log("STOP$ COMPLETED")
        

    )
    
    one$.next()
     
    
    



    
  }
  activate(id:string){
    most_log(this,"Activating ...",id,this.category,this.path,this.category)
    this.store.dispatch(MOST_createShellEntityAction(this.slice).ACTIVATE_ENTITY({path:this.path,entity:{id:id,category:this.category}}))
  }
  ngOnDestroy(){
      most_log(this,"DESTROYING")
      this.destroy$.next()
      
  }  
  

}
