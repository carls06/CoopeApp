import { Component, OnInit } from '@angular/core';
import { ModalController,ToastController } from '@ionic/angular';
import { BdPrestamoService } from 'src/app/services/bdPrestamo.service';
import { BdService } from '../../services/bd.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import { NgForm } from '@angular/forms';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-detail-prestamista',
  templateUrl: './detail-prestamista.component.html',
  styleUrls: ['./detail-prestamista.component.scss'],
})
export class DetailPrestamistaComponent implements OnInit {


  pdfObj=null;
  idUser: string;
   public data:any;
   public ahorro:number=0;
   mesArray={
    name:'',
    cantidad:''
  }
  prestamo={
    canidad:''
  };

   constructor(private modalCtrl:ModalController, private bdServ_:BdPrestamoService,public toastCtrl: ToastController) { 
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

  agregarMes(forma:NgForm){

    if (forma.valid) {
      let dinero = this.data.cantidad -  forma.value.cantidad;
      this.bdServ_.updateAhorro(this.idUser,dinero);
      this.presentToast('Mensualidad agregada Correctamente');
      this.pdfDownload();
      forma.reset();
      
    }
  }

  async presentToast(a:string) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 2000
    });
    toast.present();
  }
  ngOnInit() {}

  pdfDownload(){
    console.log('si entra');
    
    const docDef ={
      pageSize: 'A4',
      pageOrientation: 'portrait',
      PageMargins:[20,10,40,60],
      watermark: { text: 'CoopeApp Deudor', color: 'blue', opacity: 0.3, bold: true, italics: false },
      info: {
        title: this.data.nombre+'_Prestamista'
      },
      content:[
        { text: this.data.nombre,
          style: 'header'
        },'          ',
        { text: 'Ahorro',
          style: 'header'
        },'          ',
        {
          style: 'tableExample',
          table: {
            body: [
              ['Mes', 'Cantidad', 'Total Adeudado'],
              [this.mesArray.name, this.mesArray.cantidad, this.data.cantidad+(-this.mesArray.cantidad)]
            ]
          }
        }
      ],styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDef).download();

  }



}
