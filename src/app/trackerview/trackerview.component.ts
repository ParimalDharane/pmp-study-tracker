import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from 'src/app/core/user.service';
import { UsertopicService } from 'src/app/shared/usertopic.service';
import { TopicService } from 'src/app/shared/topic.service';
import { Usertopic } from 'src/app/shared/usertopic.model';
import { Topic } from 'src/app/shared/topic.model';
import { ApputilService } from 'src/app/core/apputil.service';

import * as _ from 'lodash';
import { LoginComponent } from '../login/login.component';
import * as firebase from 'firebase/app';

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
  rowIsSelected: boolean;

  //constants
  public Status_ToDo = 'To Do';
  public Status_InProgress = 'In Progress';
  public Status_Done = 'Done';

  private Message_DataLoaded = "Data loaded successfully.";
  private Message_ChangedStatus = "Changed the status to successfully";
  
  constructor(
    private userTopicService: UsertopicService,
    private topicService: TopicService,
    public userService: UserService,
    private apputilService: ApputilService,
    private firestore: AngularFirestore) {
    this.user = userService.afAuth.user;
  }

  usertopicObj = _ => {
    const object = _.payload.doc.data();
    object.topicID = _.payload.doc.id;
    return object;
  };

  ngOnInit() {
    this.rowIsSelected = false;
    // let uid = '0FFd0d9AqFVBdR9aPVRG71D0Jw62';
    console.log('selected init row=[' + this.selectedRow + ']');
    console.log(firebase.auth().currentUser, ' TrackerviewComponent   ngOnInit ');
    this.user = firebase.auth().currentUser;
    this.loadUsertopics();
  }

  loadUsertopics() {
    if (this.user === null) {
      console.log('loadUsertopics: User data is missing');
      return;
    }
    // let uid = '0FFd0d9AqFVBdR9aPVRG71D0Jw62';
    const user =  JSON.parse(localStorage.getItem('currUser'));
    console.log(user, ' get from localstorage ');
    if (user !== null) {
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

      this.apputilService.toastSuccess(this.Message_DataLoaded);

      // console.log(this.usertopics, ' received usertopics ');
      // console.log(this.usertopicsCollection, ' received usertopicsCollection ');
    }
  }

  /*
  onEdit(usertopicObj: Usertopic) {
    usertopicObj.status = 'In Progress';
    console.log(usertopicObj, ' inside onEdit');
    console.log(' inside onEdit id=' + usertopicObj.id);
    this.userTopicService.updateUsertopic(usertopicObj);
    // this.userTopicService.formData = Object.assign({}, usertopicObj);
  }
  */

  /*
  onDelete(topicID: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.firestore.doc('usertopic/' + topicID).delete();
    }
  }
  */

  changeStatus(newStatus: string) {
    if(this.selectedRow !== undefined) {
      this.selectedObj.status = newStatus;
      if(newStatus === this.Status_ToDo) {
        this.selectedObj.startDate = '';
        this.selectedObj.finishDate = '';
      } else if(newStatus === this.Status_InProgress) {
        this.selectedObj.startDate = this.todaysDate();
        this.selectedObj.finishDate = '';
      } else if(newStatus === this.Status_Done) {
        // this.selectedObj.startDate = this.todaysDate();
        this.selectedObj.finishDate = this.todaysDate();;
      }
      this.userTopicService.updateUsertopic(this.selectedObj).then( data => {
        this.apputilService.toastSuccess(this.Message_ChangedStatus);
      }).catch(error => {

      });
    }
  }
  
  setClickedRow = function(index: any, obj: Usertopic) {
    this.selectedRow = index;
    this.selectedObj = obj;
  }

  todaysDate = function() {
    let today = new Date();
    let firestoreDate = firebase.firestore.Timestamp.fromDate(today);
    return firestoreDate;
  }

}
