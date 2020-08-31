import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public fireservice: AngularFirestore) { }

  createNewEmployeee(Record) {
    return this.fireservice.collection('Employee').add(Record);
  }

  getAllEmployee() {
    return this.fireservice.collection('Employee').snapshotChanges();
  }

  updateEmployee(recordid, record) {
    this.fireservice.doc('Employee/' + recordid).update(record);
  }

  deleteEmployee(recordid) {
    this.fireservice.doc('Employee/' + recordid).delete();
  }
}
