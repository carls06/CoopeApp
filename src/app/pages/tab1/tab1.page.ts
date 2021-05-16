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
  public disponible:number=0;
  texto='';
  

  constructor(public modalController: ModalController,
    private bdServ_:BdService,private bdPrestServ_:BdPrestamoService,
    private authSer_:AuthService) {


   
  }

  ngOnInit(){
      
    this.getUser();
    
    this.getPrestamos();
    
  }

  getUser(){
    this.disponible=0;
    this.bdServ_.getUsers().subscribe((users) =>{
      let id=localStorage.getItem('idAdmin');
    
      this.users= users.filter(info => info.idadmin === id);
      
      localStorage.removeItem('disponible');
      this.users.forEach(res=>{
       
        
       this.disponible += res.ahorro;
       this.prestado+= res.prestamo;
       this.disponible-=this.prestado;
       
       localStorage.setItem('disponible', this.disponible.toString());
      });
     
    })

  }
  logout(){
    
    this.authSer_.logout();
  }
  getPrestamos(){
    this.bdPrestServ_.getPrestamistas().subscribe((prestamistas:any)=>{
      let id= localStorage.getItem('idAdmin');
      this.prestamistas= prestamistas.filter(info => info.idadmin === id);
      this.prestamistas.map((data:any)=>{
        
        this.prestado=this.prestado+ data.cantidad;
        
        this.disponible -=this.prestado;
      }
      )
      
      
    })
  }

  buscarUsuario(event){
    const text =event.target.value;

    this.texto=text;
    
  }
 

  async presentModalProf() {
    const modal = await this.modalController.create({
      component: DetailUserComponent
    });
    return await modal.present();
  }

  
  delete(id:string){
    this.bdServ_.removeuser(id);
    this.getUser();
  }

  profileView(id:string){
    
    
    localStorage.setItem('user',id);
    this.presentModalProf();
    
    
  }

}
