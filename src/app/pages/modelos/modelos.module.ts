import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelosRoutingModule } from './modelos-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaModelosComponent } from './lista-modelos/lista-modelos.component';
import { AgregarModeloComponent } from './agregar-modelo/agregar-modelo.component';


@NgModule({
  declarations: [
    ListaModelosComponent,
    AgregarModeloComponent
  ],
  imports: [
    CommonModule,
    ModelosRoutingModule,
    MatIconModule,
    DxDataGridModule,
    DxButtonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ModelosModule { }
