import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcasRoutingModule } from './marcas-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaMarcasComponent } from './lista-marcas/lista-marcas.component';
import { AgregarMarcaComponent } from './agregar-marca/agregar-marca.component';


@NgModule({
  declarations: [
    ListaMarcasComponent,
    AgregarMarcaComponent
  ],
  imports: [
    CommonModule,
    MarcasRoutingModule,
    MatIconModule,
    DxDataGridModule,
    DxButtonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MarcasModule { }
