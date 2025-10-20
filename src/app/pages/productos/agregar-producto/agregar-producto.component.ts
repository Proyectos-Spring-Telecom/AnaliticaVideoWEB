import { Component } from '@angular/core';
import { routeAnimation } from 'src/app/pipe/module-open.animation';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.scss',
  standalone: false,
  animations: [routeAnimation],
})
export class AgregarProductoComponent {

}
