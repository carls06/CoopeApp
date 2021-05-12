import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { UsuarioI } from '../models/usuario.interface';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class BdPrestamoService {

  private prestamosCollection: AngularFirestoreCollection<UsuarioI>;
  private prestamistas: Observable<UsuarioI[]>;

  constructor(db: AngularFirestore) {
    this.prestamosCollection = db.collection<UsuarioI>('Prestamos');
    this.prestamistas = this.prestamosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map((a:any) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }


  getPrestamistas() {
    return this.prestamistas;
  }

  addPrestamo(user: UsuarioI) {
    user.idadmin=localStorage.getItem('idAdmin')
    let usertemp={
    ...user,
    }
    return this.prestamosCollection.add(usertemp);
  }

  getPrestamo(id: string) {
    return this.prestamosCollection.doc<UsuarioI>(id).valueChanges();
  }
  removePrestamo(id: string){
    return this.prestamosCollection.doc(id).delete();
  }


  updateMes( id: string,mess:any){
    

   /* return this.usuarioCollection.doc(id).update(`{

      mes:[{  isChecked: ${check}, val:${mess} }

    ]}`)*/

    return this.prestamosCollection.doc(id).update(
      {
        mes:[{val:`${mess}`}]
      }
    );
  
}



}
