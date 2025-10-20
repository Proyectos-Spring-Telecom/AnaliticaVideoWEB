import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { routeAnimation } from 'src/app/pipe/module-open.animation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-equipo',
  templateUrl: './lista-equipo.component.html',
  styleUrl: './lista-equipo.component.scss',
  standalone: false,
  animations: [routeAnimation],
})
export class ListaEquipoComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid: DxDataGridComponent;
  isGrouped: boolean = false;
  public autoExpandAllGroups: boolean = true;

  constructor(private route: Router) {}

  ngOnInit(): void {}

  agregar(){
    
  }

  limpiarCampos() {
    const today = new Date();
    this.dataGrid.instance.clearGrouping();
    this.isGrouped = false;
    // this.setupDataSource();
    this.dataGrid.instance.refresh();
  }

  toggleExpandGroups() {
    const groupedColumns = this.dataGrid.instance
      .getVisibleColumns()
      .filter((col) => (col.groupIndex ?? -1) >= 0);
    if (groupedColumns.length === 0) {
      Swal.fire({
        title: '¡Ops!',
        text: 'Debes arrastar un encabezado de una columna para expandir o contraer grupos.',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entendido',
        allowOutsideClick: false,
      });
    } else {
      this.autoExpandAllGroups = !this.autoExpandAllGroups;
      this.dataGrid.instance.refresh();
    }
  }
}
