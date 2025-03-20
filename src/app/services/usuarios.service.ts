/**
 * Servicio para gestionar usuarios en la aplicación.
 * Proporciona métodos para crear, listar, buscar, actualizar y eliminar usuarios,
 * así como cambiar su estado. 
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../domain/usuario.model'; // Importa la clase Usuario
import { ApiConfigService } from './api-config-service.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl: string;

  constructor(private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.apiUrl = `${this.apiConfigService.getApiUrl()}/usuarios`;
  }

  /**
   * Obtiene el token JWT almacenado en el localStorage.
   * @returns Token JWT como string o cadena vacía si no está disponible.
   */
  private getAuthToken(): string {
    return localStorage.getItem('token') || '';
  }

  /**
   * Crea un nuevo usuario.
   * @param usuario Objeto de tipo Usuario con los datos del nuevo usuario.
   * @returns Observable con la respuesta del servidor.
   */
  crearUsuario(usuario: Usuario): Observable<Usuario> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAuthToken()}`
    });

    const { idUsuario, ...usuarioSinId } = usuario; 

    return this.http.post<Usuario>(this.apiUrl, usuarioSinId, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Lista todos los usuarios registrados.
   * @returns Observable con una lista de usuarios.
   */
  listarUsuarios(): Observable<Usuario[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}`
    });

    return this.http.get<Usuario[]>(this.apiUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Busca un usuario por su ID.
   * @param id Identificador único del usuario.
   * @returns Observable con los datos del usuario encontrado.
   */
  buscarUsuarioPorId(id: number): Observable<Usuario> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}`
    });

    return this.http.get<Usuario>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Busca usuarios por su nombre de usuario.
   * @param nombreUsuario Nombre del usuario a buscar.
   * @returns Observable con una lista de usuarios que coincidan con el nombre dado.
   */
  buscarUsuarioPorNombreUsuario(nombreUsuario: string): Observable<Usuario[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}`
    });

    return this.http.get<Usuario[]>(`${this.apiUrl}/buscar?nombreUsuario=${nombreUsuario}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Actualiza los datos de un usuario.
   * @param id Identificador del usuario.
   * @param usuario Objeto con los datos actualizados del usuario.
   * @returns Observable sin respuesta (void) en caso de éxito.
   */
  actualizarUsuario(id: number, usuario: Usuario): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAuthToken()}`
    });

    return this.http.put<void>(`${this.apiUrl}/${id}`, usuario, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Elimina un usuario de la base de datos.
   * @param id Identificador del usuario a eliminar.
   * @returns Observable sin respuesta (void) en caso de éxito.
   */
  eliminarUsuario(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}`
    });

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Cambia el estado de un usuario.
   * @param id Identificador del usuario.
   * @param estado Nuevo estado del usuario (activo/inactivo).
   * @returns Observable sin respuesta (void) en caso de éxito.
   */
  cambiarEstadoUsuario(id: number, estado: string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}`
    });

    return this.http.patch<void>(`${this.apiUrl}/${id}/estado?estado=${estado}`, null, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Manejo de errores en las solicitudes HTTP.
   * @param error Objeto HttpErrorResponse con la información del error.
   * @returns Observable que lanza un error con un mensaje personalizado.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
