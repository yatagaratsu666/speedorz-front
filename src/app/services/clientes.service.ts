import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiConfigService } from './api-config-service.service';
import { Cliente } from '../domain/cliente.model';


/**
 * Servicio para gestionar la información de clientes.
 */
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  /**
   * URL base de la API para los clientes.
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
      this.apiUrl = `${apiConfigService.getApiUrl()}/clientes`;
   }

  /**
   * Obtiene el token de autenticación almacenado en localStorage.
   * @returns El token JWT como string.
   */
  private getAuthToken(): string {
      return localStorage.getItem('token') || '';
  }

  /**
   * Crea un nuevo cliente en la base de datos.
   * @param cliente Objeto con los datos del cliente a crear.
   * @returns Un observable con el cliente creado.
   */
  crearCliente(cliente: Cliente): Observable<Cliente> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`
      });

      const { idCliente, ...clienteSinId } = cliente; 

      return this.http.post<Cliente>(this.apiUrl, clienteSinId, { headers }).pipe(
        catchError(this.handleError)
      );
  }
  
  /**
   * Lista todos los clientes registrados.
   * @returns Un observable con un array de clientes.
   */
  listarClientes(): Observable<Cliente[]> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.getAuthToken()}`
      });

      return this.http.get<Cliente[]>(this.apiUrl, { headers }).pipe(
        catchError(this.handleError)
      );
  }
  
  /**
   * Busca un cliente por su identificador único.
   * @param id Identificador del cliente.
   * @returns Un observable con el cliente encontrado.
   */
  buscarClientePorId(id: number): Observable<Cliente> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.getAuthToken()}`
      });

      return this.http.get<Cliente>(`${this.apiUrl}/${id}`, { headers }).pipe(
        catchError(this.handleError)
      );
  }
  
  /**
   * Busca clientes por su nombre legal.
   * @param nombreCliente Nombre legal del cliente.
   * @returns Un observable con un array de clientes que coincidan con el nombre legal.
   */
  buscarClientePorNombreLegal(nombreCliente: string): Observable<Cliente[]> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.getAuthToken()}`
      });

      return this.http.get<Cliente[]>(`${this.apiUrl}/buscar?nombreLegal=${nombreCliente}`, { headers }).pipe(
        catchError(this.handleError)
      );
  }
  
  /**
   * Actualiza la información de un cliente existente.
   * @param id Identificador del cliente a actualizar.
   * @param cliente Objeto con los nuevos datos del cliente.
   * @returns Un observable que emite un void cuando se completa la actualización.
   */
  actualizarCliente(id: number, cliente: Cliente): Observable<void> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`
      });

      return this.http.put<void>(`${this.apiUrl}/${id}`, cliente, { headers }).pipe(
        catchError(this.handleError)
      );
  }
  
  /**
   * Elimina un cliente de la base de datos.
   * @param id Identificador del cliente a eliminar.
   * @returns Un observable que emite un void cuando la eliminación es exitosa.
   */
  eliminarCliente(id: number): Observable<void> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.getAuthToken()}`
      });

      return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Manejo de errores en las solicitudes HTTP.
   * @param error Objeto de error HTTP.
   * @returns Un observable que lanza un error con un mensaje descriptivo.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
      console.error('An error occurred:', error);
      return throwError('Something bad happened; please try again later.');
  }
}
