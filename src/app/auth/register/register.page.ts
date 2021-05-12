import { Component, OnInit } from '@angular/core';
import { AuthModel } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  usuario: AuthModel;
  constructor(private auth: AuthService,
    private router: Router,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.usuario = new AuthModel();
  }
  Register(form: NgForm){
    if ( form.invalid ) { return; }
    this.auth.nuevoUsuario(this.usuario).subscribe(
      resp=>{
        this.presentToast('Usuario Registrado');
        this.router.navigateByUrl('/');

      }, (err) => {

        this.presentToast(err.error.error.message);

      }
    )
  }

  async presentToast(a:string) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 2000
    });
    toast.present();
  }

}
