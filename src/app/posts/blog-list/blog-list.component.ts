import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../post';
import { PostService } from '../post.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  datas: Observable<Post[]>
  showSpinner: boolean = true;

  constructor(private pservice: PostService, public auth: AuthService) { }

  ngOnInit() {
    this.datas = this.pservice.getPosts();
  }

  delete(id: string){
    this.pservice.deletePost(id);
  }
}
