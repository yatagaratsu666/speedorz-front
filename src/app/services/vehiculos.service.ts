/**
 * Servicio VehiculoService para la gestión de vehículos.
 * Proporciona métodos para realizar operaciones CRUD sobre vehículos a través de peticiones HTTP.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiConfigService } from './api-config-service.service';
import { Vehiculo } from '../domain/vehiculo.model';

@Injectable({
    providedIn: 'root'
})
export class VehiculoService {
    private apiUrl: string;

    /**
     * Constructor del servicio.
     * @param http Cliente HTTP para realizar peticiones.
     * @param apiConfigService Servicio de configuración para obtener la URL base de la API.
     */
    constructor(private http: HttpClient, private apiConfigService: ApiConfigService) {
        this.apiUrl = `${apiConfigService.getApiUrl()}/vehiculos`;
    }

    /**
     * Obtiene el token JWT desde localStorage.
     * @returns El token de autenticación o una cadena vacía si no está disponible.
     */
    private getAuthToken(): string {
        return localStorage.getItem('token') || '';
    }

    /**
     * Crea un nuevo vehículo en la base de datos.
     * @param vehiculo Objeto Vehiculo a registrar.
     * @returns Observable con el vehículo creado.
     */
    crearVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getAuthToken()}`
        });
        const { idVehiculo, ...vehiculoSinId } = vehiculo;
        return this.http.post<Vehiculo>(this.apiUrl, vehiculoSinId, { headers }).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Obtiene la lista de todos los vehículos registrados.
     * @returns Observable con un arreglo de vehículos.
     */
    listarVehiculos(): Observable<Vehiculo[]> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getAuthToken()}`
        });
        return this.http.get<Vehiculo[]>(this.apiUrl, { headers }).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Busca un vehículo por su ID.
     * @param id Identificador único del vehículo.
     * @returns Observable con el vehículo encontrado.
     */
    buscarVehiculoPorId(id: number): Observable<Vehiculo> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getAuthToken()}`
        });
        return this.http.get<Vehiculo>(`${this.apiUrl}/${id}`, { headers }).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Busca vehículos por nombre de usuario.
     * @param nombreVehiculo Nombre del vehículo a buscar.
     * @returns Observable con un arreglo de vehículos coincidentes.
     */
    buscarVehiculoPorNombreUsuario(nombreVehiculo: string): Observable<Vehiculo[]> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getAuthToken()}`
        });
        return this.http.get<Vehiculo[]>(`${this.apiUrl}/buscar?nombre=${nombreVehiculo}`, { headers }).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Actualiza la información de un vehículo.
     * @param id Identificador del vehículo a actualizar.
     * @param vehiculo Datos actualizados del vehículo.
     * @returns Observable vacío tras la actualización.
     */
    actualizarVehiculo(id: number, vehiculo: Vehiculo): Observable<void> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getAuthToken()}`
        });
        return this.http.put<void>(`${this.apiUrl}/${id}`, vehiculo, { headers }).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Elimina un vehículo por su ID.
     * @param id Identificador del vehículo a eliminar.
     * @returns Observable vacío tras la eliminación.
     */
    eliminarVehiculo(id: number): Observable<void> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getAuthToken()}`
        });
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Maneja errores en las peticiones HTTP.
     * @param error Objeto de error recibido en la petición.
     * @returns Observable que lanza un error con un mensaje descriptivo.
     */
    private handleError(error: HttpErrorResponse): Observable<never> {
        console.error('Error en la petición:', error);
        return throwError('Ocurrió un error. Intente nuevamente más tarde.');
    }
}
