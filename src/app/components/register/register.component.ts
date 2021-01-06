import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { customValidationService } from './validators'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, public r: Router, public db: FirestoreService, private afAuth: AngularFireAuth) { }

  registerForm: FormGroup
  formEmailErrorMsg: string
  formPasswordErrorMsg: string
  hide = true
  errorMsg: string

  ngOnInit(): void {
    // this.afAuth.authState.subscribe(res => res?.uid ? this.r.navigateByUrl('') : null)

    this.registerForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required],
      id: ['', Validators.required],
      birthDate: ['', Validators.required],
      phoneNumber: ['', [Validators.required, customValidationService.checkLimit(1000000000, 9999999999)]]
    })
  }

  getMailErrorMessage() {
    if (this.registerForm.controls.email.hasError('required') && this.registerForm.controls.email.dirty) {
      return this.formEmailErrorMsg = 'Email Is Required';
    }
    return this.registerForm.controls.email.hasError('pattern') ? this.formEmailErrorMsg = 'Email Is Not Valid' : '';
  }
  getPasswordErrorMsg() {
    if (this.registerForm.controls.password.hasError('required') && this.registerForm.controls.password.dirty) {
      return this.formPasswordErrorMsg = 'Password Is Required';
    }
    return this.registerForm.get('password').hasError('minlength') ? this.formPasswordErrorMsg = 'Password must be at least 3 characters' : '';
  }

  handleRegister() {
    this.db.SignUp(this.registerForm.value)
  }
  srcResult
  onFileSelected(e) {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.files;
        console.log(this.srcResult)
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
  selectedFile: FileList
  currentUpload
  detectFiles(event) {
    this.selectedFile = event.target.files
    console.log(this.selectedFile)
    this.uploadFile()
  }

  uploadFile() {
    let file = this.selectedFile.item(0)
    this.currentUpload = new Upload(file)
    this.db.pushUpload(this.currentUpload)
  }

}
class Upload {
  constructor(public file: File) { }
}