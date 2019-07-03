import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usertopic } from './usertopic.model';

@Injectable({
  providedIn: 'root'
})
export class UsertopicService {
  constructor(private firestore: AngularFirestore) { }

  getUsertopics() {
      return this.firestore.collection('usertopics').snapshotChanges();
  }
  
  formData: Usertopic;
}
