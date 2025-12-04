import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { routeAnimation } from 'src/app/pipe/module-open.animation';
import { ClientesService } from 'src/app/services/moduleService/clientes.service';
import { EquipoService } from 'src/app/services/moduleService/equipos.service';
import { InstalacionCentralSede } from 'src/app/services/moduleService/instalacion-central.service';
import { InstalacionService } from 'src/app/services/moduleService/instalaciones.service';
import { ModulosService } from 'src/app/services/moduleService/modulos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-instalacion',
  templateUrl: './agregar-instalacion.component.html',
  styleUrls: ['./agregar-instalacion.component.scss'],
  standalone: false,
  animations: [routeAnimation],
})
export class AgregarInstalacionComponent implements OnInit, AfterViewInit {
  public submitButton: string = 'Guardar';
  public loading: boolean = false;
  public insEquipoForm: FormGroup;
  public idInstalacion: any;
  public title = 'Agregar Instalación Equipo';
  public listaClientes: any[] = [];
  public listaEquipos: any[] = [];
  public listaSedeCentrales: any[] = [];
  selectedFileName: string = '';
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private moduService: ModulosService,
    private activatedRouted: ActivatedRoute,
    private route: Router,
    private clieService: ClientesService,
    private equiposService: EquipoService,
    private sedCentralService: InstalacionCentralSede,
    private instalacionService: InstalacionService
  ) { }

  ngOnInit(): void {
    this.obtenerEquipos();
    this.obtenerClientes();
    this.obtenerSedesCentrales();
    this.initForm();

    this.activatedRouted.params.subscribe(params => {
      const idParam = params['idInstalacion'];
      this.idInstalacion = idParam ? Number(idParam) : null;
      if (this.idInstalacion) {
        this.title = 'Actualizar Instalación Equipo';
        this.submitButton = 'Actualizar';
        this.obtenerInstalacion();
      }
    });
  }

  obtenerSedesCentrales() {
    this.sedCentralService.obtenerInstalaciones().subscribe((response) => {
      this.listaSedeCentrales = (response.data || []).map((c: any) => ({
        ...c,
        id: Number(c.id),
      }));
    });
  }

  obtenerClientes() {
    this.clieService.obtenerClientes().subscribe((response) => {
      this.listaClientes = (response.data || []).map((c: any) => ({
        ...c,
        id: Number(c.id),
      }));
    });
  }

  obtenerEquipos() {
    this.equiposService.obtenerEquiposDisponibles().subscribe((response) => {
      this.listaEquipos = (response.data || []).map((c: any) => ({
        ...c,
        id: Number(c.id),
      }));
    });
  }

  obtenerInstalacion() {
    this.instalacionService.obtenerInstalacion(this.idInstalacion).subscribe(
      (response: any) => {
        const data = response.data ?? response;

        this.insEquipoForm.patchValue({
          idEquipo: data.idEquipo,
          idCliente: data.idCliente,
          idSedeCentral: data.idSedeCentral,
          lat: data.lat,
          lng: data.lng
        });

        this.latSeleccionada = Number(data.lat);
        this.lngSeleccionada = Number(data.lng);

        this.actualizarMarcadorDesdeCoords();
      }
    );
  }

  initForm() {
    this.insEquipoForm = this.fb.group({
      idEquipo: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      idCliente: ['', Validators.required],
      idSedeCentral: ['', Validators.required],
    });
  }

  submit() {
    this.submitButton = this.idInstalacion ? 'Actualizando...' : 'Cargando...';
    this.loading = true;
    if (this.idInstalacion) {
      this.actualizar();
    } else {
      this.agregar();
    }
  }

  agregar() {
    this.submitButton = 'Cargando...';
    this.loading = true;

    const etiquetas: any = {
      idEquipo: 'Equipo',
      idCliente: 'Cliente',
      idSedeCentral: 'Sede Central',
    };

    const camposFaltantes: string[] = [];

    Object.keys(this.insEquipoForm.controls).forEach(key => {
      const control = this.insEquipoForm.get(key);
      if (control?.invalid && control.errors?.['required']) {
        if (key !== 'lat' && key !== 'lng') {
          camposFaltantes.push(etiquetas[key] || key);
        }
      }
    });

    const faltaUbicacion = !this.latSeleccionada || !this.lngSeleccionada;
    if (faltaUbicacion) {
      camposFaltantes.push('Ubicación de la instalación');
    }

    if (camposFaltantes.length) {
      this.submitButton = 'Guardar';
      this.loading = false;

      const lista = camposFaltantes
        .map(
          (campo, index) => `
        <div style="padding: 8px 12px; border-left: 4px solid #d9534f;
                    background: #caa8a8; text-align: center; margin-bottom: 8px;
                    border-radius: 4px;">
          <strong style="color: #b02a37;">${index + 1}. ${campo}</strong>
        </div>
      `
        )
        .join('');

      Swal.fire({
        background: '#141a21',
        color: '#ffffff',
        title: '¡Faltan datos de la instalación!',
        html: `
          <p style="text-align: center; font-size: 15px; margin-bottom: 16px; color: white">
            Los siguientes <strong>campos obligatorios</strong> están vacíos.<br>
            Por favor complétalos antes de continuar:
          </p>
          <div style="max-height: 350px; overflow-y: auto;">${lista}</div>
        `,
        icon: 'error',
        confirmButtonText: 'Entendido',
        customClass: {
          popup: 'swal2-padding swal2-border'
        }
      });
      return;
    }

    const payload = {
      idEquipo: Number(this.insEquipoForm.value.idEquipo),
      idCliente: Number(this.insEquipoForm.value.idCliente),
      idSedeCentral: Number(this.insEquipoForm.value.idSedeCentral),
      lat: Number(this.latSeleccionada),
      lng: Number(this.lngSeleccionada),
    };

    this.instalacionService.agregarInstalacion(payload).subscribe(
      (response: any) => {
        this.submitButton = 'Guardar';
        this.loading = false;
        Swal.fire({
          background: '#141a21',
          color: '#ffffff',
          title: '¡Operación Exitosa!',
          text: `Se agregó una nueva instalación de equipo de manera exitosa.`,
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Confirmar',
        });
        this.regresar();
      },
      (error: any) => {
        this.submitButton = 'Guardar';
        this.loading = false;
        Swal.fire({
          background: '#141a21',
          color: '#ffffff',
          title: '¡Ops!',
          text: error.error.message,
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Confirmar',
        });
      }
    );
  }

  actualizar() {
    this.submitButton = 'Actualizando...';
    this.loading = true;

    const etiquetas: any = {
      idEquipo: 'Equipo',
      idCliente: 'Cliente',
      idSedeCentral: 'Sede Central',
    };

    const camposFaltantes: string[] = [];

    Object.keys(this.insEquipoForm.controls).forEach(key => {
      const control = this.insEquipoForm.get(key);
      if (control?.invalid && control.errors?.['required']) {
        if (key !== 'lat' && key !== 'lng') {
          camposFaltantes.push(etiquetas[key] || key);
        }
      }
    });

    const faltaUbicacion = !this.latSeleccionada || !this.lngSeleccionada;
    if (faltaUbicacion) {
      camposFaltantes.push('Ubicación de la instalación');
    }

    if (camposFaltantes.length) {
      this.submitButton = 'Actualizar';
      this.loading = false;

      const lista = camposFaltantes
        .map(
          (campo, index) => `
        <div style="padding: 8px 12px; border-left: 4px solid #d9534f;
                    background: #caa8a8; text-align: center; margin-bottom: 8px;
                    border-radius: 4px;">
          <strong style="color: #b02a37;">${index + 1}. ${campo}</strong>
        </div>
      `
        )
        .join('');

      Swal.fire({
        background: '#141a21',
        color: '#ffffff',
        title: '¡Faltan datos de la instalación!',
        html: `
          <p style="text-align: center; font-size: 15px; margin-bottom: 16px; color: white">
            Los siguientes <strong>campos obligatorios</strong> están vacíos.<br>
            Por favor complétalos antes de continuar:
          </p>
          <div style="max-height: 350px; overflow-y: auto;">${lista}</div>
        `,
        icon: 'error',
        confirmButtonText: 'Entendido',
        customClass: {
          popup: 'swal2-padding swal2-border'
        }
      });
      return;
    }

    const payload = {
      idEquipo: this.insEquipoForm.value.idEquipo,
      lat: Number(this.latSeleccionada),
      lng: Number(this.lngSeleccionada),
      idCliente: Number(this.insEquipoForm.value.idCliente),
      idSedeCentral: Number(this.insEquipoForm.value.idSedeCentral)
    };

    this.instalacionService.actualizarInstalacion(this.idInstalacion, payload).subscribe(
      (response: any) => {
        this.submitButton = 'Actualizar';
        this.loading = false;
        Swal.fire({
          background: '#141a21',
          color: '#ffffff',
          title: '¡Operación Exitosa!',
          text: `Los datos de la instalación de equipo se actualizaron correctamente.`,
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Confirmar',
        });
        this.regresar();
      },
      (error: any) => {
        this.submitButton = 'Actualizar';
        this.loading = false;
        Swal.fire({
          background: '#141a21',
          color: '#ffffff',
          title: '¡Ops!',
          text: error.error.message,
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Confirmar',
        });
      }
    );
  }

  regresar() {
    this.route.navigateByUrl('/instalaciones');
  }

  private readonly apiKey = 'AIzaSyDuJ3IBZIs2mRbR4alTg7OZIsk0sXEJHhg';
  private readonly PIN_URL = 'assets/images/logos/marker_spring.webp';

  map: any = null;
  marker: any = null;
  latSeleccionada: number | null = null;
  lngSeleccionada: number | null = null;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadGoogleMaps()
        .then(() => this.initMap())
        .catch(err => console.error('No se pudo cargar Google Maps', err));
    }, 0);
  }

  loadGoogleMaps(): Promise<void> {
    return new Promise((resolve, reject) => {
      const w = window as any;

      if (w.google && w.google.maps) {
        resolve();
        return;
      }

      const existingScript = document.querySelector('script[data-gmaps="true"]');
      if (existingScript) {
        existingScript.addEventListener('load', () => resolve());
        existingScript.addEventListener('error', e => reject(e));
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`;
      script.async = true;
      script.defer = true;
      script.setAttribute('data-gmaps', 'true');
      script.onload = () => resolve();
      script.onerror = e => reject(e);
      document.head.appendChild(script);
    });
  }

  private actualizarMarcadorDesdeCoords(): void {
    const w = window as any;

    if (!this.map || this.latSeleccionada == null || this.lngSeleccionada == null || !w.google || !w.google.maps) {
      return;
    }

    const iconUrl = this.PIN_URL;

    if (this.marker) {
      this.marker.setMap(null);
    }

    this.marker = new w.google.maps.Marker({
      position: { lat: this.latSeleccionada, lng: this.lngSeleccionada },
      map: this.map,
      icon: {
        url: iconUrl,
        scaledSize: new w.google.maps.Size(70, 70),
        anchor: new w.google.maps.Point(35, 70)
      }
    });

    this.map.setCenter({ lat: this.latSeleccionada, lng: this.lngSeleccionada });
    this.map.setZoom(15);
  }

  initMap(): void {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    const w = window as any;
    if (!w.google || !w.google.maps) return;

    this.map = new w.google.maps.Map(mapElement, {
      center: { lat: 19.4326, lng: -99.1332 },
      zoom: 12
    });

    this.actualizarMarcadorDesdeCoords();

    this.map.addListener('click', (e: any) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      this.latSeleccionada = lat;
      this.lngSeleccionada = lng;

      this.insEquipoForm.patchValue({
        lat,
        lng
      });

      const iconUrl = this.PIN_URL;

      if (this.marker) {
        this.marker.setMap(null);
      }

      this.marker = new w.google.maps.Marker({
        position: { lat, lng },
        map: this.map,
        icon: {
          url: iconUrl,
          scaledSize: new w.google.maps.Size(70, 70),
          anchor: new w.google.maps.Point(35, 70)
        }
      });

      this.map.panTo({ lat, lng });
    });
  }

}
