import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { BdService } from '../../services/bd.service';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss'],
})
export class DetailUserComponent implements OnInit {

  pdfObj=null;

   idUser: string;
   public data:any;
   public ahorro:number=0;
   public prestamo:number=0;

   mesArray={
     name:'',
     cantidad:''
   }

   deudaArray={
    name:'',
    cantidad:''
   }
  

  constructor(private modalCtrl:ModalController, private bdServ_:BdService,public toastCtrl: ToastController) { 
   this.mostrarInfo();
  }

  ngOnInit() {
    
  }

  atras() {
    localStorage.removeItem('user');
    this.idUser='';

    this.dismiss();
    
  }
  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  mostrarInfo(){
    this.idUser=localStorage.getItem('user');
   this.bdServ_.getUser(this.idUser).subscribe(
     (datosU:any)=>{
       
      this.data=datosU;
  
     }
   );
 
  }
 
  agregarMes(forma:NgForm){

    if (forma.valid) {
      let dinero = this.data.ahorro + forma.value.cantidad;
      this.bdServ_.updateAhorro(this.idUser,dinero);
      this.presentToast('Mensualidad agregada Correctamente');
      this.pdfDownload();
      forma.reset();
      
    }
  }

  pdfDownload(){
    console.log('si entra');
    
    const docDef ={
      pageSize: 'A4',
      pageOrientation: 'portrait',
      PageMargins:[20,10,40,60],
      watermark: { text: 'CoopeApp', color: 'blue', opacity: 0.3, bold: true, italics: false },
      info: {
        title: this.data.nombre+'_'+this.mesArray.name
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
              ['Mes', 'Cantidad', 'Total Ahorrado'],
              [this.mesArray.name, this.mesArray.cantidad, this.data.ahorro+this.mesArray.cantidad]
            ]
          }
        },
        { text: 'Prestamos',
          style: 'header'
        },'          ',
        {
          style: 'tableExample',
          table: {
            body: [
              ['Mes', 'Cantidad ', 'Total Adeudado'],
              [this.deudaArray.name, this.deudaArray.cantidad, this.prestamo]
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


  async presentToast(a:string) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 2000
    });
    toast.present();
  }
}
