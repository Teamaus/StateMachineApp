import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Op650RoutingModule } from './op650-routing.module';
import { Op650Component } from './op650/op650.component';
import { StoreModule } from '@ngrx/store';
import { op650Reducer } from './op650.reducer';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { AtlasReduxModule } from 'atlas-redux';
import { TestOp650Component } from './test-op650/test-op650.component';
import { MOSTAppContainerComponent } from '../most/mostapp-container/mostapp-container.component';
import { AppModule } from '../app.module';
import { MOSTModule } from '../most/most.module';
import { ReactiveFormsModule } from '@angular/forms';

import { EntityModule } from '../entity/entity.module';
import { EffectsModule } from '@ngrx/effects';
import { Step1EchoService } from './step1/step1.effect';
import { AtlasShellLogicModule } from 'atlas-shell-logic';
import { AtlasShellUIModule } from 'atlas-shell-ui';


@NgModule({
  declarations: [
    Op650Component,
    Step1Component,
    Step2Component,
    Step3Component,
    TestOp650Component,
    
    
  ],
  imports: [
    CommonModule,
    Op650RoutingModule,
    AtlasReduxModule,
    
    AtlasShellLogicModule,
    AtlasShellUIModule,
    StoreModule.forFeature("op650",op650Reducer),
    EffectsModule.forFeature([Step1EchoService]),
    ReactiveFormsModule,
    EntityModule
  ]
})
export class Op650Module { }
