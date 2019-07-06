import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usertopic } from './usertopic.model';

@Injectable({
  providedIn: 'root'
})
export class UsertopicService {
  constructor(private db: AngularFirestore) { }

  getUsertopics(uid: string) {
      return this.db.collection('/usertopics/'+ uid + '/topics').valueChanges();
  }
  
  formData: Usertopic;
}
