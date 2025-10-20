import { Component } from '@angular/core';
import { routeAnimation } from 'src/app/pipe/module-open.animation';

@Component({
  selector: 'app-agregar-modelo',
  templateUrl: './agregar-modelo.component.html',
  styleUrl: './agregar-modelo.component.scss',
  standalone: false,
  animations: [routeAnimation],
})
export class AgregarModeloComponent {

}
