import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../domain/usuario.model';
import { UsuariosService } from '../../../services/usuarios.service';

/**
 * @class GestionListaComponentUsers
 * @description 
 * Componente para la gestión y listado de usuarios.
 */
@Component({
  selector: 'app-gestion-lista',
  templateUrl: './app-gestion-lista.component.html',
  styleUrls: ['./app-gestion-lista.component.css']
})
export class GestionListaComponentUsers implements OnInit {

  /**
   * @property usuariosFiltrados
   * @description 
   * Lista de usuarios que se muestran en la tabla.
   */
  @Input() usuariosFiltrados: Usuario[] = [];

  /**
   * @property usuarioActualizado
   * @description 
   * Evento que se emite cuando se actualiza o elimina un usuario.
   */
  @Output() usuarioActualizado = new EventEmitter<void>();

  /**
   * @constructor
   * @param {UsuariosService} usuariosService - Servicio para gestionar usuarios.
   * @param {Router} router - Servicio de navegación.
   */
  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Este método se ejecuta cuando el componente es inicializado
  }

  /**
   * @method modificarUsuario
   * @description 
   * Navega a la página de modificación de usuario.
   * @param {number} idUsuario - ID del usuario a modificar.
   */
  modificarUsuario(idUsuario: number): void {
    this.router.navigate(['/usuarios/modify', idUsuario]);
  }

  /**
   * @method cambiarEstadoUsuario
   * @description 
   * Cambia el estado de un usuario (ACTIVO/INACTIVO).
   * @param {number} idUsuario - ID del usuario.
   * @param {string} nuevoEstado - Nuevo estado del usuario.
   */
  cambiarEstadoUsuario(idUsuario: number, nuevoEstado: string): void {
    this.usuariosService.cambiarEstadoUsuario(idUsuario, nuevoEstado).subscribe({
      next: () => {
        console.log(`Estado del usuario ${idUsuario} cambiado a ${nuevoEstado}`);
        this.usuarioActualizado.emit(); // Notificar al componente padre
      },
      error: (error) => {
        console.error('Error al cambiar el estado del usuario:', error);
      }
    });
  }

  /**
   * @method eliminarUsuario
   * @description 
   * Elimina un usuario después de confirmar la acción.
   * @param {number} idUsuario - ID del usuario a eliminar.
   */
  eliminarUsuario(idUsuario: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuariosService.eliminarUsuario(idUsuario).subscribe({
        next: () => {
          console.log(`Usuario ${idUsuario} eliminado correctamente.`);
          this.usuarioActualizado.emit(); // Notificar al componente padre
        },
        error: (error) => {
          console.error('Error al eliminar el usuario:', error);
        }
      });
    }
  }
}