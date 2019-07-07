import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from 'src/app/core/user.service';
import { UsertopicService } from 'src/app/shared/usertopic.service';
import { TopicService } from 'src/app/shared/topic.service';
import { Usertopic } from 'src/app/shared/usertopic.model';
import { Topic } from 'src/app/shared/topic.model';
import * as _ from 'lodash';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-trackerview',
  templateUrl: './trackerview.component.html',
  styleUrls: ['./trackerview.component.scss']
})
export class TrackerviewComponent implements OnInit {

  defDateFormat: 'yyyy/MM/dd h:mm:ss a';
  selectedRow: any;
  selectedObj: any;
  user: any;
  topicList: Topic[];
  // usertopicList: Usertopic[];
  public usertopics: Observable<any[]>;
  private usertopicsCollection: AngularFirestoreCollection<Usertopic>;

  
  constructor(
    private userTopicService: UsertopicService,
    private topicService: TopicService,
    public userService: UserService,
    private firestore: AngularFirestore) {
    this.user = userService.afAuth.user;
  }

  usertopicObj = _ => {
    const object = _.payload.doc.data();
    object.topicID = _.payload.doc.id;
    return object;
  };

  ngOnInit() {
    // let uid = '0FFd0d9AqFVBdR9aPVRG71D0Jw62';
    const user =  JSON.parse(localStorage.getItem('currUser'));
    console.log(user, ' get from localstorage ');
    if(user !== null) {
      // let uid = '0FFd0d9AqFVBdR9aPVRG71D0Jw62';
      this.usertopicsCollection = this.userTopicService.getUsertopics(user.uid);
      // this.usertopics = this.usertopicsCollection.valueChanges();


      this.usertopics = this.usertopicsCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Usertopic;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );

      console.log(this.usertopics, ' received usertopics ');
      console.log(this.usertopicsCollection, ' received usertopicsCollection ');
    }
  }

  onEdit(usertopicObj: Usertopic) {
    usertopicObj.status = 'In Progress';
    console.log(usertopicObj, ' inside onEdit');
    console.log(' inside onEdit id=' + usertopicObj.id);
    this.userTopicService.updateUsertopic(usertopicObj);
    // this.userTopicService.formData = Object.assign({}, usertopicObj);
  }

  onDelete(topicID: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.firestore.doc('usertopic/' + topicID).delete();
    }
  }

  changeStatus(newStatus: string) {
    if(this.selectedRow !== undefined) {
      this.selectedObj.status = newStatus;
      this.userTopicService.updateUsertopic(this.selectedObj);
    }
    // usertopicObj.status = 'In Progress';
    // console.log(usertopicObj, ' inside onEdit');
    // console.log(' inside onEdit id=' + usertopicObj.id);
    
    // this.userTopicService.formData = Object.assign({}, usertopicObj);
  }

  setClickedRow = function(index: any, obj: Usertopic) {
    this.selectedRow = index;
    this.selectedObj = obj;
  }
}
