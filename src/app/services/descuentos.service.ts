import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiConfigService } from './api-config-service.service';
import { Descuento } from '../domain/descuento.model';


/**
 * Servicio para gestionar los descuentos en la aplicación.
 */
@Injectable({
  providedIn: 'root'
})
export class DescuentoService {

  /**
   * URL base de la API para los descuentos.
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
      this.apiUrl = `${apiConfigService.getApiUrl()}/descuentos`;
   }

  /**
   * Obtiene el token de autenticación almacenado en localStorage.
   * @returns El token JWT como string.
   */
  private getAuthToken(): string {
      return localStorage.getItem('token') || '';
  }
    
  /**
   * Lista todos los descuentos disponibles.
   * @returns Un observable con un array de descuentos.
   */
  listarDescuentos(): Observable<Descuento[]> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
      });

      return this.http.get<Descuento[]>(this.apiUrl, { headers }).pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtiene un descuento por su ID.
   * @param id Identificador del descuento.
   * @returns Un observable con el descuento encontrado.
   */
  obtenerDescuento(id: number): Observable<Descuento> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
      });

      return this.http.get<Descuento>(`${this.apiUrl}/${id}`, { headers }).pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Crea un nuevo descuento.
   * @param descuento Datos del descuento a crear.
   * @returns Un observable con el descuento creado.
   */
  crearDescuento(descuento: Descuento): Observable<Descuento> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
      });

      const { id, ...descuentoSinId } = descuento; 

      return this.http.post<Descuento>(this.apiUrl, descuentoSinId, { headers }).pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Actualiza un descuento existente.
   * @param descuento Datos del descuento a actualizar.
   * @returns Un observable con el descuento actualizado.
   */
  actualizarDescuento(descuento: Descuento): Observable<Descuento> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}` // Incluye el token JWT
      });

      return this.http.put<Descuento>(`${this.apiUrl}/${descuento.id}`, descuento, { headers }).pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Elimina un descuento por su ID.
   * @param id Identificador del descuento a eliminar.
   * @returns Un observable vacío.
   */
  eliminarDescuento(id: number): Observable<void> {
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
