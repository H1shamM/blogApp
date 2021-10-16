import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private fb:FormBuilder ,private http:HttpClient) { }

  readonly BaseURI = 'http://localhost:5000/api/ApplicationUser'
  formModel =this.fb.group({
    UserName:['',Validators.required],
    Email:['',Validators.email],
    FullName:['',Validators.required],
    Passwords:this.fb.group({
      Password:['',[Validators.required,Validators.minLength(4)]],
      ConfirmPassword:['',Validators.required]
    },{validator:this.comparePasswords})
  })

  comparePasswords(fb:FormGroup){
    let confimPassCrtl= fb.get('ConfirmPassword');

    if(confimPassCrtl?.errors == null || 'passwordMismatch' in confimPassCrtl.errors){
      if(fb.get('Password')?.value != confimPassCrtl?.value)
      {
        confimPassCrtl?.setErrors({passwordMismatch:true});
      }
      else
      {
        confimPassCrtl?.setErrors(null);
      }
    }
  }

  register(){
    var body ={
      UserName :this.formModel.value.UserName,
      Email :this.formModel.value.Email,
      FullName :this.formModel.value.FullName,
      Password :this.formModel.value.Passwords.Password,
    }
    return this.http.post(this.BaseURI+'/Register',body);
  }

  login(formData: any){
    return this.http.post(this.BaseURI+'/Login',formData);
  }


}
