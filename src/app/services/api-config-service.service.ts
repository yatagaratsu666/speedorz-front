import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

/**
 * Servicio de configuración para obtener la URL base de la API.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  /** URL base de la API definida en las variables de entorno */
  private readonly apiUrl: string = environment.apiUrl;

  /**
   * Obtiene la URL base de la API.
   * @returns {string} La URL de la API definida en el archivo de configuración.
   */
  getApiUrl(): string {
    return this.apiUrl;
  }
}
