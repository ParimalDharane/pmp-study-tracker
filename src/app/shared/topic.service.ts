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

  addUsertopic(topic: any) {
    return this.db.collection('/topics').add(topic);
  }

  addUsertopics(topics: any[]) {
    const topicsRef = this.db.collection('/topics');
    topics.forEach(item => {
      const newId = this.db.createId();
      topicsRef.doc(newId).set(Object.assign({}, item));
    });
    return
  }

  formData: Topic;
}
