import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usertopic } from './usertopic.model';

@Injectable({
  providedIn: 'root'
})
export class UsertopicService {
  constructor(private db: AngularFirestore) { }

  getUsertopics(uid: string) {
      // return this.db.collection('/usertopics/'+ uid + '/topics').valueChanges();
      return this.db.collection<Usertopic>('/usertopics/'+ uid + '/topics');
  }

  updateUsertopic(userTopic: any) {
    return this.db.doc('/usertopics/'+ userTopic.userid + '/topics/' + userTopic.id).update(userTopic);
  }
  
  formData: Usertopic;
}
