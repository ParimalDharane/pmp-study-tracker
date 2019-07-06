import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TopicService } from '../shared/topic.service';

@Component({
  selector: 'app-topicview',
  templateUrl: './topicview.component.html',
  styleUrls: ['./topicview.component.scss']
})
export class TopicviewComponent implements OnInit {
  public topics: Observable<any[]>;

  constructor(
    private topicService: TopicService
  ) { }

  ngOnInit() {
    this.topics = this.topicService.getTopics();
    console.log(this.topics, ' received topics ');
  }

}
