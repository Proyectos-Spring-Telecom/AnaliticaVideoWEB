import { Component } from '@angular/core';
import { routeAnimation } from 'src/app/pipe/module-open.animation';

@Component({
  selector: 'app-agregar-marca',
  templateUrl: './agregar-marca.component.html',
  styleUrl: './agregar-marca.component.scss',
  standalone: false,
  animations: [routeAnimation],
})
export class AgregarMarcaComponent {

}
