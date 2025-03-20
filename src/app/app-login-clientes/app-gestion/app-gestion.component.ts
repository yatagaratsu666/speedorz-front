import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Cliente } from '../../domain/cliente.model';
import { ClienteService } from '../../services/clientes.service';

/**
 * @class AppClientsListComponent
 * @description 
 * Componente para gestionar la lista de clientes con funciones de búsqueda y modificación.
 */
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './app-gestion.component.html',
  styleUrls: ['./app-gestion.component.css']
})
export class AppClientsListComponent implements OnInit {

  busquedaNombre: string = ''; // Término de búsqueda por nombre
  busquedaId: number | null = null; // Término de búsqueda por ID
  clientes: Cliente[] = []; // Lista de clientes

  /**
   * @constructor
   * @param {Router} router - Servicio de enrutamiento para redireccionar páginas.
   * @param {ClienteService} clienteService - Servicio para gestionar clientes.
   */
  constructor(private router: Router, private clienteService: ClienteService) {}

  /**
   * @method ngOnInit
   * @description 
   * Carga la lista de clientes al inicializar el componente.
   */
  ngOnInit(): void {
    this.cargarClientes();
  }

  /**
   * @method cargarClientes
   * @description 
   * Obtiene la lista completa de clientes desde el servicio.
   */
  cargarClientes(): void {
    this.clienteService.listarClientes().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
        alert('No se pudo obtener la lista de clientes.');
      }
    });
  }

  /**
   * @method buscarPorNombre
   * @description 
   * Realiza la búsqueda de clientes por nombre legal.
   */
  buscarPorNombre(): void {
    if (!this.busquedaNombre.trim()) {
      alert('Ingrese un nombre para la búsqueda.');
      return;
    }

    this.clienteService.buscarClientePorNombreLegal(this.busquedaNombre).subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (error) => {
        console.error('Error en la búsqueda por nombre:', error);
        alert('No se encontraron clientes con ese nombre.');
        this.clientes = [];
      }
    });
  }

  /**
   * @method buscarPorId
   * @description 
   * Realiza la búsqueda de un cliente por su ID.
   */
  buscarPorId(): void {
    if (this.busquedaId === null) {
      this.cargarClientes();
      return;
    }

    this.clienteService.buscarClientePorId(this.busquedaId).subscribe({
      next: (data) => {
        this.clientes = [data];
      },
      error: (error) => {
        console.error('Error en la búsqueda por ID:', error);
        alert('No existe un cliente con ese ID.');
        this.clientes = [];
      }
    });
  }

  /**
   * @method modificarUsuario
   * @description 
   * Redirige a la página de modificación de un cliente.
   * @param {number} id - ID del cliente a modificar.
   */
  modificarUsuario(id: number): void {
    this.router.navigate(['/clientes/modify', id]);
  }

  /**
   * @method cerrarSesion
   * @description 
   * Cierra sesión eliminando los datos de almacenamiento y redirigiendo al login.
   */
  cerrarSesion(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/clientes']);
  }
}