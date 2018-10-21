import { Component, OnInit } from '@angular/core';
import { PostService } from '../../posts/post.service';
import { Observable } from 'rxjs';
import { Post } from '../../posts/post';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.css']
})
export class LatestNewsComponent implements OnInit {

  post: Observable<Post[]>
  constructor(public postService: PostService) { }

  ngOnInit() {
    this.post = this.postService.getPostLimit();
  }
}
