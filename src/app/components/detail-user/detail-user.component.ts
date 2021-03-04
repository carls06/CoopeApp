import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BdService } from '../../services/bd.service';


@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss'],
})
export class DetailUserComponent implements OnInit {

   idUser: string;
   public data:any;
   public ahorro:number=0;

   mesArray={
     name:'jhg',
     cantidad:''
   }
  

  constructor(private modalCtrl:ModalController, private bdServ_:BdService) { 
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
      
    //console.log(forma.value.name);
      
      this.bdServ_.updateMes(this.idUser,forma.value.name);
    }

    
    

  }
  
}
