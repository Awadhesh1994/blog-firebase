import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  post: Post
  editByUser: boolean = false

  constructor(private router: ActivatedRoute, private rout: Router ,private pservice: PostService, public routes: Router, public authD: AuthService) { }

  ngOnInit() {
    this.getPostDetails();
  }

  getPostDetails(){
    const id = this.router.snapshot.paramMap.get('id');
    return this.pservice.getPostData(id).subscribe(data => this.post = data);
  }

  updatePostByUser(){
    const formData = {
      title: this.post.title,
      content: this.post.content
    };
    const id = this.router.snapshot.paramMap.get('id');
    this.pservice.updatePost(id, formData);
    this.editByUser = false;
  }

  deleteByUser(){
    const id = this.router.snapshot.paramMap.get('id');
    this.pservice.deletePost(id);
    this.routes.navigate(['/blog']);
  }

}
