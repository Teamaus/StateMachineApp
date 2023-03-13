import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fromEvent, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { entitiesByActiveCategorySelector, entitiesTreeSelector } from '../../EntityTree.reducer';
import { MOST_createShellEntityAction } from '../../MOSTShell.actions';
export function getPath(pathObj:any,category:string){

}
@Component({
  selector: 'atlas-add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.css']
})
export class AddEntityComponent implements OnInit {
  @Input() path$:Observable<any>=of([])
  
  @Input() slice:string=''
  @Input() category=''
  frm = new FormGroup({
      ID:new FormControl('')
  })
  @ViewChild('Add') addBtn?:ElementRef
  constructor(private store:Store<any>) {
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
      let ent$ =  this.store.select(entitiesByActiveCategorySelector(this.slice,this.category))
      if (this.addBtn){
          fromEvent(this.addBtn.nativeElement,"click")
          .pipe(
            switchMap(evt=>ent$.pipe(take(1))),
            /*if we dont take then every change will fireup activate again*/
            map(ent=>ent.path)
           
          
          )
          .subscribe(path=>
            {
              let actions = MOST_createShellEntityAction('profile')
              
              
              this.store.dispatch(actions.ADD_ENTITY({path:path,entity:{id:this.frm.get("ID")!.value,category:this.category}}))
            }
          )

      }
  }


}
