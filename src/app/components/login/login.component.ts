import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginService: LoginService, private r: Router) { }

  loginForm: FormGroup
  hide = true
  errorMsg: string

  private userDetails = {
    email: 'test@moveo.group',
    password: '123'
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      //  make custom mail validator
    })
  }

  getMailErrorMessage() {
    if (this.loginForm.controls.email.hasError('required') && this.loginForm.controls.email.dirty) {
      return 'Email Is Required';
    }
    return this.loginForm.controls.email.hasError('pattern') ? 'Not A Valid Email' : '';
  }
  getPasswordErrorMsg() {
    if (this.loginForm.controls.password.hasError('required') && this.loginForm.controls.password.dirty) {
      return 'Password Is Required';
    }
    return this.loginForm.get('password').hasError('minlength') ? 'Password must be at least 3 characters' : '';
  }

  handleSubmit() {
    if (this.loginForm.value.email === this.userDetails.email) {
      if (this.loginForm.value.password === this.userDetails.password) {
        this.loginService.userLogged = true
        this.r.navigateByUrl('')
      } else {
        this.errorMsg = 'Incorrect Password'
        setTimeout(() => { this.errorMsg = '' }, 1500);
      }
    } else {
      this.errorMsg = 'Email Does Not Exist'
      setTimeout(() => { this.errorMsg = '' }, 1500);
    }
  }

}


