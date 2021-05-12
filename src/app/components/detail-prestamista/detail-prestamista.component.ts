import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BdPrestamoService } from 'src/app/services/bdPrestamo.service';
import { BdService } from '../../services/bd.service';

@Component({
  selector: 'app-detail-prestamista',
  templateUrl: './detail-prestamista.component.html',
  styleUrls: ['./detail-prestamista.component.scss'],
})
export class DetailPrestamistaComponent implements OnInit {


  idUser: string;
   public data:any;
   public ahorro:number=0;

   constructor(private modalCtrl:ModalController, private bdServ_:BdPrestamoService) { 
    this.mostrarInfo();
   }

   mostrarInfo(){
    this.idUser=localStorage.getItem('userp');
   this.bdServ_.getPrestamo(this.idUser).subscribe(
     (datosU:any)=>{
       
      this.data=datosU;
  
     }
   );

  }
  atras() {
    localStorage.removeItem('userp');
    this.idUser='';

    this.dismiss();
    
  }
  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  ngOnInit() {}

}
