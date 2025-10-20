import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';


@NgModule({
  declarations: [ListaClientesComponent, AgregarClienteComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MatIconModule,
    DxDataGridModule,
    DxButtonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClientesModule { }
