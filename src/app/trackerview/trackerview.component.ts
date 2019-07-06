import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
  user: any;
  topicList: Topic[];
  // usertopicList: Usertopic[];
  public usertopics: Observable<any[]>;

  
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
    let uid = '0FFd0d9AqFVBdR9aPVRG71D0Jw62';
    let email = 'pqr';
    this.usertopics = this.userTopicService.getUsertopics(uid);
    console.log(this.usertopics, ' received usertopics ');
    let a = 12;
  }

  retrieveData() {
    /* 
    //Get all topics
     this.topicService.getTopics().subscribe(itemList => {
      this.topicList = itemList.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Topic;
      })

      console.log(this.topicList, 'topicList list');

      console.log('Current user:' + this.user.uid);
      let uid = '0FFd0d9AqFVBdR9aPVRG71D0Jw62'; //TODO remove this

     

      //Get all usertopics for current user
      this.usertopicList = this.userTopicService.getUsertopics(uid)
      .pipe(map(itemList => itemList.map(this.usertopicObj)));
*/
        /*
        this.userTopicService.getUsertopics(uid).subscribe(itemList => {
          this.usertopicList = itemList.map(item => {
            return {
              topicID: item.payload.doc.id,
              ...item.payload.doc.data()
            } as Usertopic;
          })
          */
  
          /*
      console.log(this.usertopicList, 'usertopicList list');

        //Merge the two lists
      var merged = _.map(this.topicList, function (item) {
          return _.assign(item, _.find(this.usertopicList, ['topicID', item.id]));
      });

      console.log(merged, 'Merged list');

    });
    */
  }

  onEdit(usertopicObj: Usertopic) {
    this.userTopicService.formData = Object.assign({}, usertopicObj);
  }

  onDelete(topicID: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.firestore.doc('usertopic/' + topicID).delete();
    }
  }

}
