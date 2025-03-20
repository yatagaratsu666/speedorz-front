import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiConfigService } from './api-config-service.service';

/**
 * Servicio encargado de la autenticación de usuarios.
 * 
 * Proporciona métodos para el inicio de sesión de diferentes roles de usuario y la gestión del token de autenticación.
 */
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

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
   * Inicia sesión como administrador de usuarios.
   * 
   * @param username Nombre de usuario.
   * @param password Contraseña del usuario.
   * @returns Observable con el token de autenticación.
   */
  loginAdminUsuarios(username: string, password: string): Observable<string> {
    const body = { nombreUsuario: username, contrasena: password }; // Objeto JSON

    return this.http.post(`${this.apiConfigService.getApiUrl()}/autenticacion/login-adminusuarios`, body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text'
    }).pipe(
      tap((token: string) => {
        console.log('Token recibido:', token);
        localStorage.setItem('token', token);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Inicia sesión como administrador de recepción.
   * 
   * @param username Nombre de usuario.
   * @param password Contraseña del usuario.
   * @returns Observable con el token de autenticación.
   */
  loginAdminRecepcion(username: string, password: string): Observable<string> {
    const body = { nombreUsuario: username, contrasena: password }; 

    return this.http.post(`${this.apiConfigService.getApiUrl()}/autenticacion/login-recepcion`, body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text'
    }).pipe(
      tap((token: string) => {
        console.log('Token recibido:', token);
        localStorage.setItem('token', token);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Inicia sesión como secretario.
   * 
   * @param username Nombre de usuario.
   * @param password Contraseña del usuario.
   * @returns Observable con el token de autenticación.
   */
  loginSecretario(username: string, password: string): Observable<string> {
    const body = { nombreUsuario: username, contrasena: password };

    return this.http.post(`${this.apiConfigService.getApiUrl()}/autenticacion/login-secretario`, body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text'
    }).pipe(
      tap((token: string) => {
        console.log('Token recibido:', token);
        localStorage.setItem('token', token);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Inicia sesión como administrador de inventario.
   * 
   * @param username Nombre de usuario.
   * @param password Contraseña del usuario.
   * @returns Observable con el token de autenticación.
   */
  loginAdminInventario(username: string, password: string): Observable<string> {
    const body = { nombreUsuario: username, contrasena: password };

    return this.http.post(`${this.apiConfigService.getApiUrl()}/autenticacion/login-admininventario`, body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text'
    }).pipe(
      tap((token: string) => {
        console.log('Token recibido:', token);
        localStorage.setItem('token', token);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Inicia sesión como asesor comercial.
   * 
   * @param username Nombre de usuario.
   * @param password Contraseña del usuario.
   * @returns Observable con el token de autenticación.
   */
  loginAsesorComercial(username: string, password: string): Observable<string> {
    const body = { nombreUsuario: username, contrasena: password };

    return this.http.post(`${this.apiConfigService.getApiUrl()}/autenticacion/login-asesorcomercial`, body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text'
    }).pipe(
      tap((token: string) => {
        console.log('Token recibido:', token);
        localStorage.setItem('token', token);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Cierra la sesión del usuario eliminando el token de autenticación almacenado.
   */
  logout(): void {
    localStorage.removeItem('token');
  }

  /**
   * Verifica si el usuario está autenticado.
   * 
   * @returns `true` si el usuario tiene un token de autenticación almacenado, `false` en caso contrario.
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
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
