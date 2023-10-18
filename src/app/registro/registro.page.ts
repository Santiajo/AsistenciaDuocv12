import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, public navCtrl: NavController, public animCtrl: AnimationController ) { 

    this.formularioRegistro = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'correo': new FormControl("", Validators.required),
      'contraseña': new FormControl("", Validators.required),
      'confirmarContraseña': new FormControl("", Validators.required),
    })

  }

  ngOnInit() {
    var boton = document.getElementById('Registrase') as HTMLElement;

    boton.addEventListener('click', () => {
      this.animButton();
    });

    this.animTitulo();
  }

  async registrar(){
    var f = this.formularioRegistro.value;
    var usuario = f.usuario
    var pass = f.contraseña
    var correoE = f.correo
    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Debes llenar los datos',
        buttons: ['Aceptar']
      })
      await alert.present();
      this.formularioRegistro.reset();
      return;
    }
    const emailValido = f.correo.match(/[a-zA-Z0-9\._-]+@[a-zA-Z0-9\.-]+\.[a-zA-Z]{2,6}/);
    if (f.contraseña.length < 4 || f.contraseña.length > 8) {
      const alert = await this.alertController.create({
        header: 'Contraseña inválida',
        message: 'La contraseña debe contener entre 4 y 8 caracteres',
        buttons: ['Aceptar']
      })
      await alert.present();
      this.formularioRegistro.reset();
      return;
    } else if (!emailValido) {
      const alert = await this.alertController.create({
        header: 'Correo inválido',
        message: 'El correo debe contener un @ y un .',
        buttons: ['Aceptar']
      })
      await alert.present();
      this.formularioRegistro.reset();
      return;
    } else if (f.contraseña != f.confirmarContraseña) {
      const alert = await this.alertController.create({
        header: 'Contraseña inválida',
        message: 'Las contraseñas no coinciden',
        buttons: ['Aceptar']
      })
      await alert.present();
      this.formularioRegistro.reset();
      return;
    } else {
      localStorage.setItem('usuario', JSON.stringify(usuario))
      localStorage.setItem('contraseña', JSON.stringify(pass))
      localStorage.setItem('correo', JSON.stringify(correoE))
      this.formularioRegistro.reset();
      this.navCtrl.navigateForward('/login')
    }
  }

  public animButton() {
    var boton = document.getElementById('Registrase') as HTMLElement;

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

  public animTitulo() {
    var titulo = document.getElementById('titulo') as HTMLElement;

    this.animCtrl.create()
      .addElement(titulo)
      .duration(2000)
      .iterations(Infinity)
      .fromTo('color', 'ffb71b', '#ffd856')
      .fromTo('opacity', '1', '0')
      .fromTo('transform', 'translateX(-200px)','translateX(200px)')
      .play();
  }

}
