import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController, AnimationController, LoadingController  } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, public navCtrl: NavController, public animCtrl: AnimationController, public loadCtrl: LoadingController) {

    this.formularioLogin = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'contraseña': new FormControl("", Validators.required)
    })

  }

  ngOnInit() {
    var boton = document.getElementById('Ingresar') as HTMLElement;

    boton.addEventListener('click', () => {
      this.animButton();
    });

    this.showLoading();
  }

  async logear() {
    var f = this.formularioLogin.value;
    var usuarioString = localStorage.getItem('usuario')
    var contraseñaString = localStorage.getItem('contraseña')
    if (usuarioString !== null && contraseñaString !== null) {
      var usuario = JSON.parse(usuarioString);
      var pass = JSON.parse(contraseñaString);
    }
    if (usuario == f.usuario && pass == f.contraseña) {
      localStorage.setItem('ingresado', 'true');
      console.log('Ingresado');
      this.formularioLogin.reset();
      this.navCtrl.navigateForward('/home')
    } else if (this.formularioLogin.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Uno a más campos se encuentran vacíos',
        buttons: ['Aceptar']
      });
      await alert.present();
      this.formularioLogin.reset();
      return;
    } else {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos ingresados son incorrectos',
        buttons: ['Aceptar']
      });
      await alert.present();
      this.formularioLogin.reset();
      return;
    }
  }

  public animButton() {
    var boton = document.getElementById('Ingresar') as HTMLElement;

    this.animCtrl.create()
      .addElement(boton)
      .duration(200)
      .fromTo('scale', 1, 1.015)
      .fromTo('backgroundColor', 'ffb71b', '#ffd856')
      .play()

    this.animCtrl.create()
      .addElement(boton)
      .duration(200)
      .fromTo('scale', 1.015, 1)
      .fromTo('backgroundColor', '#ffd856', '#ffb71b')
      .play()
  }

  async showLoading() {
    const loading = await this.loadCtrl.create({ message: 'Cargando...', duration: 2000});
    await loading.present();
  }
}
