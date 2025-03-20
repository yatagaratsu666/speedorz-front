import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiConfigService } from './api-config-service.service';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.apiUrl = `${this.apiConfigService.getApiUrl()}/reportes`;
  }

  private getAuthToken(): string {
    return localStorage.getItem('token') || '';
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}`,
      'Accept': 'application/pdf'
    });
  }

  generarReporteInventario(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/inventario`, {
      headers: this.getHeaders(),
      responseType: 'blob'
    }).pipe(
      catchError(this.handleError)
    );
  }

  generarReportePedidos(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/pedidos`, {
      headers: this.getHeaders(),
      responseType: 'blob'
    }).pipe(
      catchError(this.handleError)
    );
  }

  generarReporteVentas(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/ventas`, {
      headers: this.getHeaders(),
      responseType: 'blob'
    }).pipe(
      catchError(this.handleError)
    );
  }

  generarHistoricoPrecios(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/historico`, {
      headers: this.getHeaders(),
      responseType: 'blob'
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
} 
