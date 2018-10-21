import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(data => this.authState = data);
  }

  get authenticated(): boolean{
    return this.authState != null;
  }

  get currentUserId(): string{
    return this.authenticated ? this.authState.uid : null;
  }

  logIn(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logInWithFacebook(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  logOut(){
    this.afAuth.auth.signOut();
    this.router.navigate(['/blog']);
  }

}
