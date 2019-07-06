import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Topic } from './topic.model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  constructor(private db: AngularFirestore) { }

  getTopics() {
      return this.db.collection('/topics').valueChanges();
  }
  
  formData: Topic;
}
