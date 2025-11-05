import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InstalacionCentral {

    constructor(private http: HttpClient) { }

    obtenerEquiposData(page: number, pageSize: number): Observable<any> {
        return this.http.get(`${environment.API_SECURITY}/equipos/${page}/${pageSize}`);
    }

    obtenerInstalacionCentral(): Observable<any> {
        return this.http.get(`${environment.API_SECURITY}/instalacion-central`);
    }
}