import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../domain/vehiculo.model';
import { VehiculoService } from '../../services/vehiculos.service';
import { InventarioService } from '../../services/inventario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { GestionListaVehiculosComponent } from "./app-gestion-lista/app-gestion-lista.component";

/**
 * Componente encargado de la gestión de vehículos.
 * Permite listar, buscar por nombre y buscar por ID, además de manejar la sesión del usuario.
 * @class GestionComponentVehiculos
 * @component GestionComponentVehiculos
 * @style ./app-gestion.component.css
 */
@Component({
  selector: 'app-gestion-vehiculos',
  templateUrl: './app-gestion.component.html',
  styleUrls: ['./app-gestion.component.css'],
  imports: [GestionListaVehiculosComponent, FormsModule, CommonModule, RouterModule]
})
export class GestionVehiculosComponent implements OnInit {

  /**
   * Término de búsqueda para filtrar vehículos por nombre de usuario.
   */
  searchTerm: string = '';

  /**
   * Lista de vehículos filtrados según la búsqueda.
   */
  vehiculosFiltrados: Vehiculo[] = [];

  /**
   * Lista completa de vehículos cargados desde el servicio.
   */
  allVehiculos: Vehiculo[] = [];

  /**
   * Identificador para buscar un vehículo específico.
   */
  searchId: number | null = null;

  /**
   * Constructor del componente.
   * @param vehiculoService Servicio para gestionar vehículos.
   * @param router Servicio para la navegación entre rutas.
   */
  constructor(
    private vehiculoService: VehiculoService, 
    private inventarioService: InventarioService,
    private router: Router
  ) {}

  /**
   * Método del ciclo de vida de Angular, se ejecuta al iniciar el componente.
   */
  ngOnInit(): void {
    this.cargarVehiculos();
  }

  /**
   * Carga todos los vehículos utilizando el servicio correspondiente.
   */
  cargarVehiculos(): void {
    this.vehiculoService.listarVehiculos().subscribe({
      next: (data) => {
        this.allVehiculos = data;
        this.vehiculosFiltrados = data;
      },
      error: (error) => {
        console.error('Error al cargar vehículos:', error);
      }
    });
  }

  /**
   * Filtra los vehículos basados en el término de búsqueda.
   */
  buscarVehiculos(): void {
    if (this.searchTerm.trim()) {
      this.vehiculoService.buscarVehiculoPorNombreUsuario(this.searchTerm).subscribe({
        next: (data) => {
          this.vehiculosFiltrados = data;
        },
        error: (error) => {
          console.error('Error al buscar vehículos:', error);
          this.vehiculosFiltrados = [];
        }
      });
    } else {
      this.vehiculosFiltrados = this.allVehiculos;
    }
  }

  /**
   * Busca un vehículo por su ID.
   */
  buscarVehiculoPorId(): void {
    if (this.searchId === null) {
      this.cargarVehiculos();
    } else {
      this.vehiculoService.buscarVehiculoPorId(this.searchId).subscribe({
        next: (data) => {
          this.vehiculosFiltrados = [data];
        },
        error: (error) => {
          console.error('No existe vehículo con ese ID:', error);
          this.vehiculosFiltrados = [];
        }
      });
    }
  }

  /**
   * Cierra la sesión del usuario y redirige a la página de clientes.
   */
  cerrarSesion(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/clientes']);
  }

  /**
   * Genera y descarga el reporte de inventario en formato PDF.
   */
  generarReporteInventario(): void {
    this.inventarioService.generarReporteInventario().subscribe({
      next: (data) => this.descargarArchivo(data, 'reporte-inventario.pdf'),
      error: (error) => console.error('Error al generar reporte de inventario:', error)
    });
  }

  /**
   * Genera y descarga el reporte histórico de precios en formato PDF.
   */
  generarReporteHistorico(): void {
    this.inventarioService.generarHistoricoPrecios().subscribe({
      next: (data) => this.descargarArchivo(data, 'reporte-historico.pdf'),
      error: (error) => console.error('Error al generar reporte de inventario:', error)
    });
  }

  /**
   * Genera y descarga el reporte de pedidos en formato PDF.
   */
  generarReportePedido(): void {
    this.inventarioService.generarReportePedidos().subscribe({
      next: (data) => this.descargarArchivo(data, 'reporte-pedidos.pdf'),
      error: (error) => console.error('Error al generar reporte de inventario:', error)
    });
  }

  /**
   * Genera y descarga el reporte de ventas en formato PDF.
   */
  generarReporteVentas(): void {
    this.inventarioService.generarReporteVentas().subscribe({
      next: (data) => this.descargarArchivo(data, 'reporte-ventas.pdf'),
      error: (error) => console.error('Error al generar reporte de inventario:', error)
    });
  }

  /**
   * Método para descargar el archivo generado.
   * @param data Blob con los datos del archivo.
   * @param filename Nombre del archivo a descargar.
   */
  private descargarArchivo(data: Blob, filename: string): void {
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
