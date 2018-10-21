import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { PostService } from '../post.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.css']
})
export class BlogDashboardComponent implements OnInit {

  title: string;
  image: string = null;
  content: string;
  category: string;
  lesscontant: string;

  uploadPercentage: Observable<number>;
  downloadUrl: Observable<string>;

  editorConfig = {
    editable: true,
    spellcheck: false,
    height: '20rem',
    minHeight: '5rem',
    placeholder: 'Type your blog content ...',
    translate: 'no'
  };

  constructor(private serviceAuth: AuthService, private servicePost: PostService, private sfstorage: AngularFireStorage) { }

  ngOnInit() {
  }

  createPostInfo() {
    const data = {
      author: this.serviceAuth.authState.displayName || this.serviceAuth.authState.email,
      authorId: this.serviceAuth.currentUserId,
      title: this.title,
      content: this.content,
      published: new Date(),
      image: this.image,
      userProfileImage: this.serviceAuth.authState.photoURL,
      category: this.category,
      lesscontant: this.lesscontant
    };
    this.servicePost.createPost(data);
    this.title = "",
    this.content = "",
    this.category = ""
    this.lesscontant = "",
    this.image = null
  }

  imageUpload(event) {
    const file = event.target.files[0];
    const path = `posts/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('try to upload image');
    } else {
      const ref = this.sfstorage.ref(path);
      const task = this.sfstorage.upload(path, file);
      this.uploadPercentage = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadUrl = ref.getDownloadURL();
          this.downloadUrl.subscribe(url => this.image = url)
        }
      )).subscribe()
    }
  }
}
