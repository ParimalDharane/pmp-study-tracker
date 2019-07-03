
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/shared/student.service';
import { Student } from 'src/app/shared/student.model';
 
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
 
  list: Student[];
  constructor(private service: StudentService,
    private firestore: AngularFirestore) { }
 
  ngOnInit() {
    this.service.getStudents().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Student;
      })
    });
  }
 
  onEdit(studentObj: Student) {
    this.service.formData = Object.assign({}, studentObj);
  }
 
  onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.firestore.doc('students/' + id).delete();
    }
  }
 
}