import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { combineReducers, compose, StoreModule } from '@ngrx/store';
import { AtlasComponentContainerComponent, AtlasComposeReducers, AtlasReduxModule } from 'atlas-redux';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { T1Reducer, T2Reducer } from './TestReducers';
import { EffectsModule } from '@ngrx/effects';




import { EmptyComponent } from './empty/empty.component';
import { MOSTAppContainerComponent } from './most/mostapp-container/mostapp-container.component';
import { MOSTModule } from './most/most.module';
import { TestExpressionsComponent } from './test-expressions/test-expressions.component';
import { EntityModule } from './entity/entity.module';
import {HttpClientModule} from '@angular/common/http'
import {MAP_TOKEN} from '../../../MapApp/src/app/MapToken'

import {entityTreeReducer,AtlasShellEffectService, SLICES, metaReducers, AtlasShellLogicModule} from 'atlas-shell-logic'
import { AtlasShellUIModule } from 'atlas-shell-ui';




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
    
    AtlasReduxModule,
    EntityModule,
    MOSTModule,
    
    
    StoreModule.forRoot({profile:entityTreeReducer("profile")},{metaReducers}),
    EffectsModule.forRoot([AtlasShellEffectService]),
    
    
    
  ],
  exports:[AtlasComponentContainerComponent],
  providers: [{provide:SLICES,useValue:["profile"]},{provide:MAP_TOKEN,useValue:"Host"}],
  bootstrap: [AppComponent]
})
export class AppModule { }
