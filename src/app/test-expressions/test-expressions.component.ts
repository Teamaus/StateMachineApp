import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-test-expressions',
  templateUrl: './test-expressions.component.html',
  styleUrls: ['./test-expressions.component.css']
})
export class TestExpressionsComponent implements OnInit {
  a = of(7)
  obj = {
      "A":{"B":1},
      "C":{"X":2}

  }
  B = "B"
  slice =''
  getObj(obj:any,v:string[]):any{
      if (v.length == 0){
        console.log("OBJ",obj)
        return obj
      }
      let [first,...rest] = v
      let key = first
      if (first.startsWith("[") && first.endsWith("]")){
          key = eval("this."+first.slice(1,-1))
      }
      console.log("KEY",key)
      return this.getObj(obj[key],rest)
  }
  @Input() set path(v:string){
      let s = v.split("/")
      this.slice = this.getObj(this.obj,s)
      console.log("OBJ",this.slice)
  }
  constructor() {
      
   }
   async do(){
    return this.a.toPromise()
    
   }
  get A():any{
      return 5
      return (async ()=>{
            try
            {
              
                return await this.a.toPromise()
            }
            catch{
              return 0
            }

        }
          
      )()
      
       
   }

  ngOnInit(): void {
  }

}
