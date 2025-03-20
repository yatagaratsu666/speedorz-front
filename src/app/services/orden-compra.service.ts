import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiConfigService } from './api-config-service.service';
import { OrdenCompraDTO } from '../domain/orden-compra-dto.model';
import { OrdenCompra } from '../domain/orden-compra.model';


/**
 * Servicio para la gestión de órdenes de compra.
 * 
 * Este servicio permite crear órdenes de compra y manejar la comunicación con la API.
 */
@Injectable({
  providedIn: 'root'
})
export class OrdenCompraService {

  /**
   * URL base de la API para las órdenes de compra.
   */
  private apiUrl: string;

  /**
   * Constructor del servicio.
   * 
   * @param http Cliente HTTP de Angular para realizar peticiones.
   * @param apiConfigService Servicio de configuración para obtener la URL de la API.
   */
  constructor(private http: HttpClient, 
    private apiConfigService: ApiConfigService
  ) {
      this.apiUrl = `${apiConfigService.getApiUrl()}/ordenescompra`;
   }

  /**
   * Obtiene el token JWT almacenado en localStorage.
   * 
   * @returns Token de autenticación como string.
   */
  private getAuthToken(): string {
    return localStorage.getItem('token') || '';
  }
    
  /**
   * Crea una nueva orden de compra en la API.
   * 
   * @param ordenCompraDTO Datos de la orden de compra.
   * @returns Observable con la orden de compra creada.
   */
  crearOrdenCompra(ordenCompraDTO: OrdenCompraDTO): Observable<OrdenCompra> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
    });

    return this.http.post<OrdenCompra>(this.apiUrl, ordenCompraDTO, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Maneja errores en las peticiones HTTP.
   * 
   * @param error Objeto HttpErrorResponse con detalles del error.
   * @returns Observable con un mensaje de error.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
