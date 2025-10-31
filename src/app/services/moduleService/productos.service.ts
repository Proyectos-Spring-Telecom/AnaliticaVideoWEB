import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  obtenerProductosData(page: number, pageSize: number): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/catProductos/${page}/${pageSize}`);
  }

  obtenerProductos(): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/catProductos/list`);
  }

  agregarProducto(data: FormData) {
    return this.http.post(environment.API_SECURITY + '/catProductos', data);
  }

  eliminarProducto(idProducto: Number) {
    return this.http.delete(environment.API_SECURITY + '/catProductos/' + idProducto);
  }

  obtenerProducto(idProducto: number): Observable<any> {
    return this.http.get<any>(environment.API_SECURITY + '/catProductos/' + idProducto);
  }

  actualizarProducto(idProducto: number, saveForm: any): Observable<any> {
    return this.http.put(`${environment.API_SECURITY}/catProductos/` + idProducto, saveForm);
  }

  private apiUrl = `${environment.API_SECURITY}/catProductos`;
  updateEstatus(id: number, estatus: number): Observable<string> {
    const url = `${this.apiUrl}/${id}/estatus`;
    const body = { estatus };
    return this.http.patch(url, body, { responseType: 'text' }).pipe(
      catchError(error => throwError(() => error))
    );
  }
}