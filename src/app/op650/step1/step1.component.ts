import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { entityTreeActivePathSelector } from 'src/app/EntityTree.reducer';

import { MOSTComponentService } from 'src/app/most/mostcomponent.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css'],
  
})
export class Step1Component implements OnInit {
  operationPath=[]
  constructor(private store:Store<any>,public mostComponentService:MOSTComponentService) {
     this.store.select(entityTreeActivePathSelector("profile"))
     .subscribe(path=>{this.operationPath = path;console.log("STEP 1 PATH",path)}
      )
     
   }

  ngOnInit(): void {
        
  }
  frm = this.mostComponentService.createForm("STEP1FORM",{
    name:new FormControl(''),
    email:new FormControl('',Validators.email)
  }
  )


}
