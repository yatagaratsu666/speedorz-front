import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiConfigService } from './api-config-service.service';
/**
 * Servicio para la gestión de promociones de vehículos.
 * 
 * Este servicio maneja la comunicación con la API para obtener información sobre promociones.
 */
@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  /**
   * Constructor del servicio.
   * 
   * @param http Cliente HTTP de Angular para realizar peticiones.
   * @param apiConfigService Servicio de configuración para obtener la URL de la API.
   */
  constructor(private http: HttpClient, 
    private apiConfigService: ApiConfigService
  ) {}

  /**
   * Obtiene la lista de vehículos en promoción desde la API.
   * 
   * @returns Observable con la respuesta de la API.
   */
  getVehiculos(): Observable<any> {
    return this.http.get(`${this.apiConfigService.getApiUrl()}/vehiculos-promocion`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Genera los encabezados HTTP para la solicitud.
   * 
   * @returns HttpHeaders con el token de autenticación y el tipo de contenido.
   */
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Maneja errores en las peticiones HTTP.
   * 
   * @param error Objeto HttpErrorResponse con detalles del error.
   * @returns Observable con un mensaje de error.
   */
  private handleError(error: HttpErrorResponse) {
    console.error('Error:', error);
    return throwError('Error en la petición al servidor');
  }
}
