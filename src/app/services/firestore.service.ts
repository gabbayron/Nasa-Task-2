import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app'
import { Router } from '@angular/router';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  user$: Observable<User>
  userData: Observable<any>

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth, private r: Router) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
    this.user$ = afAuth.authState
  }

  createUser(userInfo) {
    return this.db.collection('users').add({
      fname: userInfo.fname,
      lname: userInfo.lname,
      email: userInfo.email,
      password: userInfo.password,
      address: userInfo.address,
      id: userInfo.id,
      birthDate: userInfo.birthDate,
      phoneNumber: userInfo.phoneNumber
    })
  }

  /* Sign up */
  SignUp(userInfo) {
    this.afAuth.createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(res => {
        console.log('You are Successfully signed up!', res);
        this.r.navigateByUrl('')
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });
    return this.db.collection('users').add({
      fname: userInfo.fname,
      lname: userInfo.lname,
      email: userInfo.email,
      password: userInfo.password,
      address: userInfo.address,
      id: userInfo.id,
      birthDate: userInfo.birthDate,
      phoneNumber: userInfo.phoneNumber
    })
  }

  /* Sign in */
  SignIn(userInfo) {
    this.afAuth.signInWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(res => {
        console.log('You are Successfully logged in!', res);
        this.r.navigateByUrl('')
      })
      .catch(err => {
        alert(`mething is wrong: ${err.message}`);
        console.log(err)
      });
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`)
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    this.r.navigateByUrl('')
    console.log(user)
    return userRef.set(data, { merge: true })
  }


  async googleSignIn() {
    const provider = new firebase.default.auth.GoogleAuthProvider()
    const credential = await this.afAuth.signInWithPopup(provider)
    return this.updateUserData(credential.user)
  }

  async facebookSignIn() {
    const provider = new firebase.default.auth.FacebookAuthProvider()
    const credential = await this.afAuth.signInWithPopup(provider)
    return this.updateUserData(credential.user)
  }



  async signOut() {
    await this.afAuth.signOut();
    return this.r.navigateByUrl('landing')
  }

}
