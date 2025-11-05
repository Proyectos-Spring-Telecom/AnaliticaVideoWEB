import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  constructor(private http: HttpClient) { }

  obtenerModelosData(page: number, pageSize: number): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/modelos/${page}/${pageSize}`);
  }

  obtenerModelos(): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/modelos`);
  }

  agregarModelo(data: FormData) {
    return this.http.post(environment.API_SECURITY + '/modelos', data);
  }

  eliminarModelo(idMarca: number) {
    return this.http.delete(environment.API_SECURITY + '/modelos/' + idMarca);
  }

  obtenerModelo(idMarca: number): Observable<any> {
    return this.http.get<any>(environment.API_SECURITY + '/modelos/' + idMarca);
  }

  actualizarModelo(idMarca: number, saveForm: {
          nombre: string;
        }) {
        return this.http.patch<any>(`${environment.API_SECURITY}/modelos/${idMarca}`, saveForm);
    }

  private apiUrl = `${environment.API_SECURITY}/modelos/activar`;
  private apiUrlDes = `${environment.API_SECURITY}/modelos/desactivar`;
  updateEstatusActivar(id: number, estatus: number): Observable<string> {
    const url = `${this.apiUrl}/${id}`;
    const body = { estatus };
    return this.http.patch(url, body, { responseType: 'text' }).pipe(
      catchError(error => throwError(() => error))
    );
  }

  updateEstatusDesactivar(id: number, estatus: number): Observable<string> {
    const url = `${this.apiUrlDes}/${id}`;
    const body = { estatus };
    return this.http.patch(url, body, { responseType: 'text' }).pipe(
      catchError(error => throwError(() => error))
    );
  }
}