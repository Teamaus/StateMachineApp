import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Op550RoutingModule } from './op550-routing.module';
import { Op550Component } from './op550/op550.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    Op550Component
  ],
  imports: [
    CommonModule,
    Op550RoutingModule,
    ReactiveFormsModule
  ]
})
export class Op550Module { }
