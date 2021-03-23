import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthI } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  auth: AuthI = new AuthI();
  

  constructor(
    private authSer_:AuthService,
    private router: Router,
    private toastCtrl: ToastController
    ) { }

  ngOnInit() {
  }
  
  login(f:NgForm){

    if (f.invalid ) { return; }

    //console.log(f.value);
    this.authSer_.login(this.auth).subscribe(resp=>{
      
      if (resp) {
        this.router.navigateByUrl('/tab/tabs/tab1');
      }else{
        this.presentToast("Usuario o contraseña incorrecta");
      }

    })
    
          
  }
 
  async presentToast(a:string) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 2000
    });
    toast.present();
  }

}
