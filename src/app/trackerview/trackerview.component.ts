import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsertopicService } from 'src/app/shared/usertopic.service';
import { Usertopic } from 'src/app/shared/usertopic.model';

@Component({
  selector: 'app-trackerview',
  templateUrl: './trackerview.component.html',
  styleUrls: ['./trackerview.component.scss']
})
export class TrackerviewComponent implements OnInit {

  defDateFormat:'yyyy/MM/dd h:mm:ss a';
  usertopicList: Usertopic[];

  constructor(private service: UsertopicService,
    private firestore: AngularFirestore) { }

    ngOnInit() {
      this.service.getUsertopics().subscribe(actionArray => {
        this.usertopicList = actionArray.map(item => {
          return {
            topicID: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Usertopic;
        })
      });
    }

    onEdit(usertopicObj: Usertopic) {
      this.service.formData = Object.assign({}, usertopicObj);
    }
   
    onDelete(topicID: string) {
      if (confirm("Are you sure to delete this record?")) {
        this.firestore.doc('usertopic/' + topicID).delete();
      }
    }
  
}
