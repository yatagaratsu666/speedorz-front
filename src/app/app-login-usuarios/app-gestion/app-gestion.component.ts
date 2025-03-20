import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../domain/usuario.model';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GestionListaComponentUsers } from './app-gestion-lista/app-gestion-lista.component';

/**
 * @class GestionComponentUsers
 * @description 
 * Componente para gestionar usuarios en el sistema.
 */
@Component({
  selector: 'app-gestion', // Selector del componente
  standalone: true, // Define el componente como standalone
  imports: [CommonModule, FormsModule, RouterModule, GestionListaComponentUsers], // Importaciones necesarias
  templateUrl: './app-gestion.component.html', // Ruta del template HTML
  styleUrls: ['./app-gestion.component.css'] // Ruta de los estilos CSS
})
export class GestionComponentUsers implements OnInit {
  
  /**
   * @property searchTerm
   * @description 
   * Término de búsqueda por nombre de usuario.
   */
  searchTerm: string = '';

  /**
   * @property usuariosFiltrados
   * @description 
   * Lista de usuarios filtrados a mostrar.
   */
  usuariosFiltrados: Usuario[] = [];

  /**
   * @property searchId
   * @description 
   * ID del usuario que se busca por número.
   */
  searchId: number | null = null;

  /**
   * @constructor
   * @param {UsuariosService} usuariosService - Servicio de usuarios.
   * @param {Router} router - Servicio de enrutamiento.
   */
  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  /**
   * @method ngOnInit
   * @description 
   * Se ejecuta al iniciar el componente y carga los usuarios.
   */
  ngOnInit(): void {
    this.cargarUsuarios();
  }

  /**
   * @method cargarUsuarios
   * @description 
   * Carga la lista completa de usuarios desde el servicio.
   */
  cargarUsuarios(): void {
    this.usuariosService.listarUsuarios().subscribe({
      next: (data) => {
        this.usuariosFiltrados = data;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
  }

  /**
   * @method buscarUsuarios
   * @description 
   * Busca usuarios por nombre de usuario.
   */
  buscarUsuarios(): void {
    const termino = this.searchTerm.trim();
    
    if (termino) {
      this.usuariosService.buscarUsuarioPorNombreUsuario(termino).subscribe({
        next: (data) => {
          this.usuariosFiltrados = data;
        },
        error: (error) => {
          console.error('Error al buscar usuarios:', error);
        }
      });
    } else {
      this.cargarUsuarios();
    }
  }

  /**
   * @method buscarUsuarioPorId
   * @description 
   * Busca un usuario por su ID.
   */
  buscarUsuarioPorId(): void {
    if (this.searchId === null) {
      this.cargarUsuarios();
    } else {
      this.usuariosService.buscarUsuarioPorId(this.searchId).subscribe({
        next: (data) => {
          this.usuariosFiltrados = [data];
        },
        error: (error) => {
          console.error('Error al buscar usuario por ID:', error);
          this.usuariosFiltrados = [];
        }
      });
    }
  }

  /**
   * @method cerrarSesion
   * @description 
   * Cierra la sesión del usuario y redirige a la página de inicio.
   */
  cerrarSesion(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/usuarios']);
  }
}