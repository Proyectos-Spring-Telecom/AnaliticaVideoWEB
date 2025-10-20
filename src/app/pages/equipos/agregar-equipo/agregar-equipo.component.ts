import { Component } from '@angular/core';
import { routeAnimation } from 'src/app/pipe/module-open.animation';

@Component({
  selector: 'app-agregar-equipo',
  templateUrl: './agregar-equipo.component.html',
  styleUrl: './agregar-equipo.component.scss',
  standalone: false,
  animations: [routeAnimation],
})
export class AgregarEquipoComponent {

}
