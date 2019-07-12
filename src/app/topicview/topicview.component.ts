import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TopicService } from '../shared/topic.service';
import { Topic } from '../shared/topic.model';
import { OrderPipe } from 'ngx-order-pipe';


@Component({
  selector: 'app-topicview',
  templateUrl: './topicview.component.html',
  styleUrls: ['./topicview.component.scss']
})
export class TopicviewComponent implements OnInit {
  public topics: Observable<any[]>;
  public topicsCount: number;
  public topicsSearch: any;

  public records: any[] = [];
  order: string = 'code';
  reverse: boolean = false;
  @ViewChild('csvReader') csvReader: any;

  constructor(
    private topicService: TopicService,
    private orderPipe: OrderPipe
  ) { }

  ngOnInit() {
    this.topics = this.topicService.getTopics();
    console.log(this.topics, ' received topics');
    this.topics.subscribe(result => {
      this.topicsCount = result.length;
      // this.topics = this.orderPipe.transform(this.topics, 'code');
    });
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  uploadListener($event: any): void {

    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        console.log(this.records, 'loaded csv records');
        this.addToDb();
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == headerLength) {  
        let csvRecord: Topic = new Topic();
        csvRecord.code = curruntRecord[0].trim();  
        csvRecord.name = curruntRecord[1].trim();  
        csvRecord.area = curruntRecord[2].trim();  
        csvRecord.procgroup = curruntRecord[3].trim();  
        csvArr.push(csvRecord);  
      }  
    }  
    return csvArr;  
  }
  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
  }
  addToDb() {
    this.topicService.addUsertopics(this.records);
  }
}
