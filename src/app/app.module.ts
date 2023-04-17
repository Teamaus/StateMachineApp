
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { EffectsModule } from '@ngrx/effects';




import { EmptyComponent } from './empty/empty.component';
import { TestExpressionsComponent } from './test-expressions/test-expressions.component';
import {MAP_TOKEN} from '../../../MapApp/src/app/MapToken'

import {entityTreeReducer,AtlasShellEffectService, SLICES, metaReducers, AtlasShellLogicModule} from 'atlas-shell-logic'
import { AtlasShellUIModule } from 'atlas-shell-ui';
import { StoreModule } from '@ngrx/store';




@NgModule({
  declarations: [
    AppComponent,
    EmptyComponent,
    TestExpressionsComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AtlasShellUIModule,
    AtlasShellLogicModule,
    
    
    
    StoreModule.forRoot({profile:entityTreeReducer("profile")},{metaReducers}),
    EffectsModule.forRoot([AtlasShellEffectService]),
    
    
    
  ],
  
  providers: [{provide:SLICES,useValue:["profile"]},{provide:MAP_TOKEN,useValue:"Host"}],
  bootstrap: [AppComponent]
})
export class AppModule { }
