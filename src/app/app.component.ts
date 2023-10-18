import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Inicio de sesión', url: '/login', icon: 'person' },
    { title: 'Registro', url: '/registro', icon: 'add' },
    { title: 'Rick and Morty', url: '/api', icon: 'exit' },
    { title: 'Conoce tu ubicación', url: '/maps', icon: 'map' },
  ];
  constructor(private menu: MenuController, public router: Router) {}

  cerrarSesion() {
    localStorage.removeItem('ingresado');
    this.router.navigate(['/login']);
    this.menu.close();
  }
  abrirMapa() {
    this.router.navigate(["/mapa"]);
    this.menu.close();
  }
}
