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

  constructor(private fb: FormBuilder, private loginService: LoginService, public r: Router) { }

  loginForm: FormGroup
  hide = true
  errorMsg: string
  formEmailErrorMsg: string
  formPasswordErrorMsg

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
      return this.formEmailErrorMsg = 'Email Is Required';
    }
    return this.loginForm.controls.email.hasError('pattern') ? this.formEmailErrorMsg = 'Email Is Not Valid' : '';
  }
  getPasswordErrorMsg() {
    if (this.loginForm.controls.password.hasError('required') && this.loginForm.controls.password.dirty) {
      return this.formPasswordErrorMsg = 'Password Is Required';
    }
    return this.loginForm.get('password').hasError('minlength') ? this.formPasswordErrorMsg = 'Password must be at least 3 characters' : '';
  }

  handleSubmit() {
    if (this.loginForm.value.email === this.userDetails.email && this.loginForm.value.password === this.userDetails.password) {
      this.r.navigateByUrl('')
      this.loginService.userLogged = true
    } else {
      this.errorMsg = 'Wrong Email or password'
      setTimeout(() => { this.errorMsg = '' }, 1500);
    }
  }

}


