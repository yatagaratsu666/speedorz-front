import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiConfigService } from './api-config-service.service';
import { Impuesto } from '../domain/impuesto.model';

/**
 * Servicio para gestionar los impuestos en la aplicación.
 */
@Injectable({
  providedIn: 'root'
})
export class ImpuestoService {

  /**
   * URL base de la API para los impuestos.
   */
  private apiUrl: string;

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes a la API.
   * @param apiConfigService Servicio de configuración de la API.
   */
  constructor(private http: HttpClient, 
    private apiConfigService: ApiConfigService
  ) {
      this.apiUrl = `${apiConfigService.getApiUrl()}/impuestos`;
  }

  /**
   * Obtiene el token de autenticación almacenado en localStorage.
   * @returns El token JWT como string.
   */
  private getAuthToken(): string {
      return localStorage.getItem('token') || '';
  }
    
  /**
   * Lista todos los impuestos disponibles.
   * @returns Un observable con un array de impuestos.
   */
  listarImpuestos(): Observable<Impuesto[]> {
      const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
      });

      return this.http.get<Impuesto[]>(this.apiUrl, { headers }).pipe(
          catchError(this.handleError)
      );
  }

  /**
   * Obtiene un impuesto por su ID.
   * @param id Identificador del impuesto.
   * @returns Un observable con el impuesto encontrado.
   */
  obtenerImpuesto(id: number): Observable<Impuesto> {
      const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
      });

      return this.http.get<Impuesto>(`${this.apiUrl}/${id}`, { headers }).pipe(
          catchError(this.handleError)
      );
  }

  /**
   * Crea un nuevo impuesto.
   * @param impuesto Datos del impuesto a crear.
   * @returns Un observable con el impuesto creado.
   */
  crearImpuesto(impuesto: Impuesto): Observable<Impuesto> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
      });

      const { id, ...impuestoSinId } = impuesto; 

      return this.http.post<Impuesto>(this.apiUrl, impuestoSinId, { headers }).pipe(
          catchError(this.handleError)
      );
  }

  /**
   * Actualiza un impuesto existente.
   * @param impuesto Datos del impuesto a actualizar.
   * @returns Un observable con el impuesto actualizado.
   */
  actualizarImpuesto(impuesto: Impuesto): Observable<Impuesto> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
      });

      return this.http.put<Impuesto>(`${this.apiUrl}/${impuesto.id}`, impuesto, { headers }).pipe(
          catchError(this.handleError)
      );
  }

  /**
   * Elimina un impuesto por su ID.
   * @param id Identificador del impuesto a eliminar.
   * @returns Un observable vacío.
   */
  eliminarImpuesto(id: number): Observable<void> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
      });

      return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
          catchError(this.handleError)
      );
  }

  /**
   * Manejo de errores en las solicitudes HTTP.
   * @param error Objeto de error HTTP.
   * @returns Un observable que lanza un error.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
      console.error('An error occurred:', error);
      return throwError('Something bad happened; please try again later.');
  }
}
