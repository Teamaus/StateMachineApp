import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MOSTAppContainerComponent } from './mostapp-container/mostapp-container.component';



@NgModule({
  declarations: [
    MOSTAppContainerComponent
  ],
  imports: [
    CommonModule
  ],
  
  exports:[MOSTAppContainerComponent]
})
export class MOSTModule { }
