import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { BdPrestamoService } from '../../services/bdPrestamo.service';

@Component({
  selector: 'app-prestamistas',
  templateUrl: './prestamistas.component.html',
  styleUrls: ['./prestamistas.component.scss'],
})
export class PrestamistasComponent implements OnInit {

  constructor(public modalCtrl: ModalController, 
    public bdPrestServ_:BdPrestamoService,
    public toastCtrl: ToastController) { }

  ngOnInit() {}

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  atras() {

    this.dismiss();
    //this.router.navigateByUrl('/tabs/tab1');
  }
  async presentToast(a:string) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 2000
    });
    toast.present();
  }

  agregarPrestamo(f:NgForm){
    if (this.bdPrestServ_.addPrestamo(f.value)) {
      this.presentToast('Prestamo agregado Correctamente');
      f.reset();
    }

  }

}
