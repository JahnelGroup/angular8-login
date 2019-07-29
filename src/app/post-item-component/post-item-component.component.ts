import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../posts/models/post'
import { PostsService } from '../posts/posts.service';

@Component({
  selector: 'app-post-item-component',
  templateUrl: './post-item-component.component.html',
  styleUrls: ['./post-item-component.component.scss']
})
export class PostItemComponentComponent implements OnInit {
  @Input() post: Post //Initialized in ngOnInit
  @Output() deletedPost: EventEmitter<Post> = new EventEmitter();

  postDate: String;
  hidden: boolean = false;

  static monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postDate = this.getDate(this.post.created);
  }

  private getDate(created): String {
    if(created == "Just Now"){
      return created;
    }

    const unorderedDate = created.match(/\d+\-\d+\-\d+/)[0]
    let splitDate = unorderedDate.split('-');
    let date = PostItemComponentComponent.monthNames[parseInt(splitDate[1]) - 1] + " " + splitDate[2] + ", " + splitDate[0];

    const longTime = created.match(/T(.*)/)[1];
    const time = longTime.substring(0,5);
    const hour = (parseInt(time.substring(0,2)) - 4) % 24;
    const timeAMPM = (hour < 1 ? hour : hour - 12) + time.substring(2) + ( (hour < 12 || hour == 24)? 'am' : 'pm');

    return "on " + date + " at " + timeAMPM;
  }

  private delete(){
    // Emit up to parent for delete and UI delete
    this.deletedPost.emit(this.post);
  }

}
