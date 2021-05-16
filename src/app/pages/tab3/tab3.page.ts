import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BdService } from 'src/app/services/bd.service';
import { BdPrestamoService } from '../../services/bdPrestamo.service';
import{DetailPrestamistaComponent} from '../../components/detail-prestamista/detail-prestamista.component'


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public prestamistas=[];

  constructor(public modalController: ModalController, private bdPrestServ_:BdPrestamoService,) {
    this.bdPrestServ_.getPrestamistas().subscribe(data=>{
      let id= localStorage.getItem('idAdmin');
      this.prestamistas= data.filter(info => info.idadmin === id);
      
      console.log(this.prestamistas);
      
    })
  }

  

  async presentModalProf() {
    const modal = await this.modalController.create({
      component: DetailPrestamistaComponent
    });
    return await modal.present();
  }

  delete(id:string){
    this.bdPrestServ_.removePrestamo(id);
    
  }

  profilePrestamista(id:string){
    console.log(id);
    this.presentModalProf();
    localStorage.setItem('userp',id);
   
  }

}
