import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app'
import { User } from '../interfaces';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  user$: Observable<User>
  userData: Observable<any>
  userId: string
  username: string
  userSearchHistory
  userPhoto
  userInfo

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth, private r: Router, private afdb: AngularFireDatabase) {

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
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log(user)
        this.userInfo = user
        this.userPhoto = user.photoURL
        this.userId = user.uid
        this.username = user.displayName
      }
    })
  }

  private uploadTask: firebase.default.storage.UploadTask

  pushUpload(upload) {
    let storageRef = firebase.default.storage().ref();
    this.uploadTask = storageRef.child(`/uploads/${this.userId}`).put(upload.file);
    this.uploadTask.on(firebase.default.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        console.log(error)
      },
      () => {
        upload.url = this.uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
      }
    )
  }


  updateInfo(userInfo) {
    if (!this.userId) return
    this.db.collection('users').doc(`${this.userId}`).update(userInfo)
  }


  addSearchHistory() {
    if (!this.userId) return;
    this.db.collection('search_history').doc(`${this.userId}`).set({
      history: this.userSearchHistory
    })
  }

  getSearchHistory(): any {
    if (!this.userId) return
    this.db.collection('search_history').doc(`${this.userId}`).get().subscribe(
      (res: any) => {
        res.data() ? this.userSearchHistory = res.data().history : this.userSearchHistory = []
      }
    )
  }


  /* Sign up */
  SignUp(userInfo) {
    this.afAuth.createUserWithEmailAndPassword(userInfo.email, userInfo.password).then(cred => {
      const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${cred.user.uid}`)
      const data = {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: `${userInfo.fname} ${userInfo.lname}`,
        photoURL: cred.user.photoURL
      }
      this.r.navigateByUrl('')
      return userRef.set(data, { merge: true })
    }).catch(err => alert(err.message))

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
    try {
      const provider = new firebase.default.auth.GoogleAuthProvider()
      const credential = await this.afAuth.signInWithPopup(provider)
      return this.updateUserData(credential.user)

    } catch (error) {
      throw error
    }
  }

  async facebookSignIn() {
    const provider = new firebase.default.auth.FacebookAuthProvider()
    const credential = await this.afAuth.signInWithPopup(provider)
    return this.updateUserData(credential.user)
  }

  async signOut() {
    await this.afAuth.signOut();
    this.userPhoto = ''
    return this.r.navigateByUrl('landing')
  }

}
