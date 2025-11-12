import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InstalacionCentral {
  constructor(private http: HttpClient) {}

  obtenerInstalacionesData(page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('limit', String(limit));

    return this.http.get(
      `${environment.API_SECURITY}/instalacion-central/paginated`,
      { params }
    );
  }

  obtenerInstalaciones(): Observable<any> {
    return this.http.get(
      `${environment.API_SECURITY}/instalacion-central/list`
    );
  }

  agregarInstalacion(data: FormData) {
    return this.http.post(
      environment.API_SECURITY + '/instalacion-central',
      data
    );
  }

  eliminarInstalacion(idCliente: Number) {
    return this.http.delete(
      environment.API_SECURITY + '/instalacion-central/' + idCliente
    );
  }

  obtenerInstalacion(idCliente: number): Observable<any> {
    return this.http.get<any>(
      environment.API_SECURITY + '/instalacion-central/' + idCliente
    );
  }

  actualizarInstalacion(idCliente: number, saveForm: any): Observable<any> {
    return this.http.put(
      `${environment.API_SECURITY}/instalacion-central/` + idCliente,
      saveForm
    );
  }

  private apiUrl = `${environment.API_SECURITY}/instalacion-central`;
  updateEstatus(id: number, estatus: number): Observable<string> {
    const url = `${this.apiUrl}/estatus/${id}`;
    const body = { estatus };
    return this.http
      .patch(url, body, { responseType: 'text' })
      .pipe(catchError((error) => throwError(() => error)));
  }
}
