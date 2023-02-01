import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { combineReducers, compose, StoreModule } from '@ngrx/store';
import { AtlasComponentContainerComponent, AtlasComposeReducers, AtlasReduxModule } from 'atlas-redux';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { bReducer, compositeActionMetaReducer, getActivePath, getSearchPath, mappedReducer, metaReducers, myReducer } from './StateMachine.reducer';
import { T1Reducer, T2Reducer } from './TestReducers';
import { EffectsModule } from '@ngrx/effects';
import { EffectService } from './effect.service';
import { contextReducer } from './context.reducer';
import { entityTreeReducer } from './EntityTree.reducer';
import { Op650Module } from './op650/op650.module';
import { EmptyComponent } from './empty/empty.component';
import { MOSTAppContainerComponent } from './most/mostapp-container/mostapp-container.component';
import { MOSTModule } from './most/most.module';

@NgModule({
  declarations: [
    AppComponent,
    EmptyComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AtlasReduxModule,
    MOSTModule,
    StoreModule.forRoot({profile:entityTreeReducer,context:contextReducer},{metaReducers}),
    
    
   
   // EffectsModule.forRoot([EffectService, ]),
    
    
  ],
  exports:[AtlasComponentContainerComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
