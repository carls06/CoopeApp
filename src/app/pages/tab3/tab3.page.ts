import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BdService } from 'src/app/services/bd.service';
import { BdPrestamoService } from '../../services/bdPrestamo.service';
import { PrestamistasComponent } from '../../components/prestamistas/prestamistas.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public prestamistas=[];

  constructor(public modalController: ModalController, private bdPrestServ_:BdPrestamoService,) {
    this.bdPrestServ_.getPrestamistas().subscribe(data=>{
      this.prestamistas=data;
      console.log(this.prestamistas);
      
    })
  }

  

  delete(id:string){
    this.bdPrestServ_.removePrestamo(id);
  }

  profilePrestamista(id:string){
    console.log(id);
    

  }

}
