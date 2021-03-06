import { Component } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { PrestamistasComponent } from 'src/app/components/prestamistas/prestamistas.component';
import { UsuariosComponent } from 'src/app/components/usuarios/usuarios.component';
import { BdService } from 'src/app/services/bd.service';
import { BdPrestamoService } from 'src/app/services/bdPrestamo.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public modalController: ModalController, private bdServ_:BdService,private bdPrestServ_:BdPrestamoService,public actionSheetController: ActionSheetController) {}


  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      mode:'ios',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Agregar persona',
        icon: 'person-add-outline',
        handler: () => {
          this.add();
        }
      }, {
        text: 'Agregar prestamos',
        icon: 'cash-outline',
        handler: () => {
          
          this.addPrestamos();
        }
      },{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass:'botoncancel',
        
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentModalAdd() {
    const modal = await this.modalController.create({
      component: UsuariosComponent
    });
    return await modal.present();
  }
  add(){

    this.presentModalAdd();
    
  }
  async presentModalAddP() {
    const modal = await this.modalController.create({
      component: PrestamistasComponent
    });
    return await modal.present();
  }

  addPrestamos(){
    this.presentModalAddP();
  }

}
