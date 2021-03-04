import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { BdService } from '../../services/bd.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {

  constructor(private router:Router,
    public modalCtrl: ModalController, 
    private bdServ_: BdService,
    public toastCtrl: ToastController) { }

  ngOnInit() {}

  atras() {

    this.dismiss();
    //this.router.navigateByUrl('/tabs/tab1');

  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  agregarPersona(f:NgForm){

    if (this.bdServ_.addUser(f.value)) {
      this.presentToast('Usuario Guardado Correctamente');
      f.reset();
    }
    


  }
  async presentToast(a:string) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 2000
    });
    toast.present();
  }





}
