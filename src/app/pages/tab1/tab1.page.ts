import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioI } from 'src/app/models/usuario.interface';
import { UsuariosComponent } from '../../components/usuarios/usuarios.component';
import { BdService } from '../../services/bd.service';
import { DetailUserComponent } from '../../components/detail-user/detail-user.component';
import { BdPrestamoService } from '../../services/bdPrestamo.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';





@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  users: UsuarioI[];
  prestamistas=[];
  public prestado:number=0;
  

  constructor(public modalController: ModalController,
    private bdServ_:BdService,private bdPrestServ_:BdPrestamoService,
    private authSer_:AuthService) {
   
  }

  ngOnInit(){
      
    this.getUser();
    this.getPrestamos();
  }

  getUser(){
    this.bdServ_.getUsers().subscribe((users) =>{
      this.users = users;
    })

  }
  logout(){
    
    this.authSer_.logout();
  }
  getPrestamos(){
    this.bdPrestServ_.getPrestamistas().subscribe((prestamistas:any)=>{
      this.prestamistas=prestamistas;
      this.prestamistas.map((data:any)=>{
        
        this.prestado=this.prestado+ data.cantidad;
        
      }
      )
      
      
    })
  }

 

  async presentModalProf() {
    const modal = await this.modalController.create({
      component: DetailUserComponent
    });
    return await modal.present();
  }

  
  delete(id:string){
    this.bdServ_.removeuser(id);
  }

  profileView(id:string){
    localStorage.setItem('user',id);
    this.presentModalProf();
    
    
  }

}
