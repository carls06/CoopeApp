import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { UsuarioI } from '../models/usuario.interface';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class BdService {

  private usuarioCollection: AngularFirestoreCollection<UsuarioI>;
  private users: Observable<UsuarioI[]>;

  constructor(db: AngularFirestore) {
    this.usuarioCollection = db.collection<UsuarioI>('usuarios');
    this.users = this.usuarioCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map((a:any) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }


  getUsers() {
    return this.users;
  }

  addUser(user: UsuarioI) {
    let usertemp={
    ...user,
    mes:[]
    /*mes:[ 
    {isChecked: false,val:'Enero'},
    {isChecked: false,val:'Febrero'},
    {isChecked: false,val:'Marzo'},
    {isChecked: false,val:'Abril'},
    {isChecked: false,val:'Mayo'},
    {isChecked: false,val:'Junio'},
    {isChecked: false,val:'Julio'},
    {isChecked: false,val:'Agosto'},
    {isChecked: false,val:'Septiembre'},
    {isChecked: false,val:'Octubre'},
    {isChecked: false,val:'Noviembre'},
    {isChecked: false,val:'Diciembre'},
    ]*/
    

    }
    return this.usuarioCollection.add(usertemp);
  }

  getUser(id: string) {
    return this.usuarioCollection.doc<UsuarioI>(id).valueChanges();
  }
  removeuser(id: string){
    return this.usuarioCollection.doc(id).delete();
  }


  updateMes( id: string,mess:any){
    

   /* return this.usuarioCollection.doc(id).update(`{

      mes:[{  isChecked: ${check}, val:${mess} }

    ]}`)*/

    /*return this.usuarioCollection.doc(id).update(
      {
        mes:[{val:`${mess}`}]
      }
    );

    this.usuarioCollection.doc(id).set( 
      {  mes:[{val:`${mess}`,cant:20}]
    },{ merge: true }
    )*/
    this.usuarioCollection.doc(id).collection('mes')
    .add({val:`${mess}`,cant:20})
  
    
  
}



}
