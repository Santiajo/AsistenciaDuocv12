import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { HttpClient } from '@angular/common/http';

const API_KEY = '1ae9cef324502547711e145295b09a11';
const API_URL = 'https://api.openweathermap.org/data/2.5';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  nombreUsuario = localStorage.getItem('usuario');
  userr = this.nombreUsuario?.slice(1,-1);
  lectura : any;
  temperatura : any;
  fecha = new Date()
  constructor(private httpClient: HttpClient, private animCtrl: AnimationController) { 
    this.cargarDatos()
  }

  ngOnInit() {
    const boton = Array.from(document.getElementsByClassName('botonn'));

    this.animTitulo();

    for (const button of boton) {
      button.addEventListener('click', (event) => {
        this.animButton(event.currentTarget as Element);
      });
    }
  }

  public animTitulo() {
    var titulo = document.getElementById('tituloPiola') as HTMLElement;

    this.animCtrl.create()
      .addElement(titulo)
      .duration(2000)
      .iterations(Infinity)
      .fromTo('color', 'ffb71b', '#ffd856')
      .fromTo('opacity', '1', '0')
      .fromTo('transform', 'translateX(-200px)','translateX(200px)')
      .play();
  }

  public animButton(button: Element) {
    this.animCtrl.create()
      .addElement(button)
      .duration(200)
      .fromTo('scale', 1, 1.03)
      .fromTo('backgroundColor', 'ffb71b', '#ffd856')
      .play();

    this.animCtrl.create()
      .addElement(button)
      .duration(200)
      .fromTo('scale', 1.03, 1)
      .fromTo('backgroundColor', '#ffd856', '#ffb71b')
      .play();
  }
  

  async startScan() {
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    this.toggleVisibility();
    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      this.lectura = result.content;
    }
    this.toggleVisibility(); 
  }

  showContent: boolean = false
  
  toggleVisibility() {
    this.showContent  = !this.showContent ;
  }

  cargarDatos(){
    interface WeatherResponse {
      main: {
        temp: number;
      };
    }
    this.httpClient.get(`${API_URL}/weather?lat=${-33.68909}&lon=${-71.21528}&appid=${API_KEY}`).subscribe(resultado => {
      console.log(resultado)
      const weatherResponse = resultado as WeatherResponse;
      this.temperatura = weatherResponse.main.temp;
    });
  }
}

