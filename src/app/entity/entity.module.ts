import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEntityComponent } from './add-entity/add-entity.component';
import { AtlasEntityPanelComponent } from './atlas-entity-panel/atlas-entity-panel.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AtlasEntityPanelComponent,
    AddEntityComponent,
   ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[AtlasEntityPanelComponent,
    AddEntityComponent]
})
export class EntityModule { }
