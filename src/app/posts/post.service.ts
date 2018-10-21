import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Post } from './post';
import 'rxjs/add/operator/map'
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postsCollection: AngularFirestoreCollection<Post>
  limitPostsCollection: AngularFirestoreCollection<Post>
  postDoc: AngularFirestoreDocument<Post>

  constructor(private afs: AngularFirestore) {
    this.postsCollection = this.afs.collection('posts');
    this.limitPostsCollection = this.afs.collection('posts', ref => ref.orderBy('published','desc').limit(1));
  }

  getPosts(){
    return this.postsCollection.snapshotChanges().map(acttions => {
      return acttions.map(a => {
        const data = a.payload.doc.data() as Post
        let id = a.payload.doc.id
        return {id, ...data}
      })
    })
  }

  getPostLimit(){
    return this.limitPostsCollection.snapshotChanges().map(ac => {
      return ac.map(a => {
        const data = a.payload.doc.data() as Post
        let id = a.payload.doc.id
        return {id, ...data}
      })
    })
  }

  getPostData(id: string){
    this.postDoc = this.afs.doc<Post>(`posts/${id}`);
    return this.postDoc.valueChanges();
  }

  getPostInfo(id: string){
    return this.afs.doc<Post>(`posts/${id}`);
  }

  createPost(data: Post){
    this.postsCollection.add(data);
  }

  updatePost(id: string, formData){
    return this.getPostInfo(id).update(formData);
  }

  deletePost(id: string){
    return this.getPostInfo(id).delete();
  }

}


