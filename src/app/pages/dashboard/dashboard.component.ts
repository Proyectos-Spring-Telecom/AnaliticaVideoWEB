import { Component, OnInit } from '@angular/core';
import { routeAnimation } from 'src/app/pipe/module-open.animation';

interface DatoPie {
  etiqueta: string;
  value: number;
}

type Item = { grupo?: string; rango?: string; valor: number };

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false,
  animations: [routeAnimation],
})
export class DashboardComponent implements OnInit {
  now = new Date();

  // Banner
  hit = {
    genero: 'Hombre',
    edad: 35,
    estado: 'Feliz',
    id: 60165
  };


  // Totales
  totalPersonas = 545;
  totalHombres = 141;
  totalMujeres = 404;

  // Data Gráfica



  consultar(): void {
    // Aquí conectas tu servicio para recargar:
    // 1) hit, 2) totales, 3) dataSource de cada gráfica.
    // Dejo mock para que la vista ya funcione.
    // this.miServicio.obtenerDashboard(this.fechaInicio, this.fechaFin)
    //   .subscribe(resp => { ... });
  }

  public informacionGrid: any;
  public edadesAgrupadas: any;
  public edadesMujeres: any;
  public edadesHombres: any;
  public showFilterRow: boolean;
  public showHeaderFilter: boolean;
  public loadingVisible: boolean = false;
  public mensajeAgrupar: string =
    'Arrastre un encabezado de columna aquí para agrupar por esa columna';
  public loading: boolean = false;
  public loadingMessage: string = 'Cargando...';
  public distribucionPorHora: any;
  public fechaSeleccionada: Date = new Date();

  public fechaInicio: Date = new Date();
  public fechaFin: Date = new Date();
  public resultadoRango: any;
  public buttonInfo: boolean = false;
  public buttonsFecha: boolean = true;
  public modoConsultaPorRango: boolean = false;
  public ultimoHit: any = null;
  public totalFiltrado: number = 0;

  ngOnInit(): void {
    
  }


  customizeEdadTooltip = (pointInfo: any) => {
    return {
      text: `${pointInfo.argumentText} Años:   ${pointInfo.valueText} Personas`,
    };
  };


  customizeEdadMujeresTooltip = (pointInfo: any) => {
    return {
      text: `${pointInfo.argumentText}:   ${pointInfo.value} Mujeres`,
    };
  };


  customizeEdadHombresTooltip = (pointInfo: any) => {
    return {
      text: `${pointInfo.argumentText}:   ${pointInfo.value} Hombres`,
    };
  };

  // H/M: 1 = rosa, 2 = azul
chartHits = [
  { grupo: 'Hombres', valor: 190, colors: 2 },
  { grupo: 'Mujeres', valor: 355, colors: 1 },
];

// Ambos: 1..4 mapean a tu colorMap
chartEdadesAmbos = [
  { rango: '0 - 20', valor: 50,  color: 1 },
  { rango: '21 - 40', valor: 300, color: 2 },
  { rango: '41 - 60', valor: 170, color: 3 },
  { rango: '61+',    valor: 25,  color: 4 },
];

// Mujeres: 1..4 (paleta rosa)
chartEdadesMujeres = [
  { rango: '0 - 20', valor: 40,  color: 1 },
  { rango: '21 - 40', valor: 250, color: 2 },
  { rango: '41 - 60', valor: 100, color: 3 },
  { rango: '61+',    valor: 14,  color: 4 },
];

// Hombres: 1..4 (paleta azul)
chartEdadesHombres = [
  { rango: '0 - 20', valor: 10,  color: 1 },
  { rango: '21 - 40', valor: 50,  color: 2 },
  { rango: '41 - 60', valor: 70,  color: 3 },
  { rango: '61+',    valor: 11,  color: 4 },
];

// === Tus funciones tal cual ===
// Datos para la barra apilada
hitsPorHora = [
  { hora: '09:00', hombres: 0,  mujeres: 0  },
  { hora: '10:00', hombres: 1,  mujeres: 3  },
  { hora: '11:00', hombres: 10, mujeres: 25 },
  { hora: '12:00', hombres: 17, mujeres: 35 },
  { hora: '13:00', hombres: 10, mujeres: 47 },
  { hora: '14:00', hombres: 14, mujeres: 44 },
  { hora: '15:00', hombres: 15, mujeres: 43 },
  { hora: '16:00', hombres: 7,  mujeres: 46 },
  { hora: '17:00', hombres: 13, mujeres: 48 },
  { hora: '18:00', hombres: 17, mujeres: 43 },
  { hora: '19:00', hombres: 20, mujeres: 37 },
  { hora: '20:00', hombres: 17, mujeres: 33 },
  { hora: '21:00', hombres: 0,  mujeres: 0  },
];

// 👇 Reutiliza el mismo customizePoint; lo extiendo para dxChart por nombre de serie
customizePoint = (pointInfo: any) => {
  // Si viene de la barra apilada, pintamos por nombre de serie
  if (pointInfo?.seriesName) {
    if (pointInfo.seriesName === 'Mujeres') return { color: '#ff69b4' }; // rosa
    if (pointInfo.seriesName === 'Hombres') return { color: '#4a90e2' }; // azul
  }

  // Si viene de las donas, usamos el índice que ya manejabas
  switch (pointInfo?.data?.colors) {
    case 1: return { color: '#ff69b4' }; // Mujeres
    case 2: return { color: '#4a90e2' }; // Hombres
    default: return {};
  }
};


customizeEdadPoint = (point: any) => {
  const colorMap: { [k: number]: string } = {
    1: '#8e44ad',
    2: '#f39c12',
    3: '#16a085',
    4: '#c0392b',
  };
  return { color: colorMap[point.data.color] || '#7f8c8d' };
};



customizeEdadMujeresPoint = (point: any) => {
  const colorMap: { [k: number]: string } = {
    1: '#ff69b4',
    2: '#f06292',
    3: '#ec407a',
    4: '#c2185b',
  };
  return { color: colorMap[point.data.color] || '#e1bee7' };
};


customizeEdadHombresPoint = (point: any) => {
  const colorMap: { [k: number]: string } = {
    1: '#0d6efd',
    2: '#3b8beb',
    3: '#5caeff',
    4: '#b6d4fe',
  };
  return { color: colorMap[point.data.color] || '#cfd8dc' };
};




   areas: any[];

   pointClickHandler(e: any) {
    this.toggleVisibility(e.target);
  }

  legendClickHandler(e: any) {
    const arg = e.target;
    const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];

    this.toggleVisibility(item);
  }

  toggleVisibility(item: any) {
    if (item.isVisible()) {
      item.hide();
    } else {
      item.show();
    }
  }

  // Datos demo (sustituye por los tuyos al consultar)
registros = [
  { genero: 'Hombre', edad: 35, estado: 'Feliz',   fechaHora: new Date(), id: 60165 },
  { genero: 'Hombre', edad: 39, estado: 'Neutral', fechaHora: new Date(), id: 60164 },
  { genero: 'Mujer',  edad: 42, estado: 'Neutral', fechaHora: new Date(), id: 60163 },
  { genero: 'Hombre', edad: 30, estado: 'Neutral', fechaHora: new Date(), id: 60162 },
  { genero: 'Mujer',  edad: 42, estado: 'Neutral', fechaHora: new Date(), id: 60161 },
  { genero: 'Hombre', edad: 28, estado: 'Neutral', fechaHora: new Date(), id: 60160 },
  { genero: 'Mujer',  edad: 45, estado: 'Neutral', fechaHora: new Date(), id: 60159 },
  { genero: 'Mujer',  edad: 28, estado: 'Neutral', fechaHora: new Date(), id: 60158 },
  { genero: 'Mujer',  edad: 26, estado: 'Neutral', fechaHora: new Date(), id: 60157 },
  { genero: 'Hombre', edad: 28, estado: 'Neutral', fechaHora: new Date(), id: 60156 },
];

// Muestra: “35 Años”
edadText = (cellInfo: any) => (cellInfo?.value || cellInfo?.value === 0)
  ? `${cellInfo.value} Años`
  : '';

}
