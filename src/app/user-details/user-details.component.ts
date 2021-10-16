import { Component, OnInit } from '@angular/core';
import {UsersService} from "../data/users.service";
import {FormControl, NgForm} from "@angular/forms";
import {User} from "../data/user.model";
import {ToastrService} from "ngx-toastr";
import  {FormGroup ,FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(public service:UsersService,private toastr:ToastrService,private fb:FormBuilder) {  }

  PhotoFilePath:string = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/56a1a0cc-b0cb-4d3e-93e7-2118e12e2662/d48sdvg-23441248-91d1-4a6c-bde2-0b8d50bf56bb.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzU2YTFhMGNjLWIwY2ItNGQzZS05M2U3LTIxMThlMTJlMjY2MlwvZDQ4c2R2Zy0yMzQ0MTI0OC05MWQxLTRhNmMtYmRlMi0wYjhkNTBiZjU2YmIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.VyNRXwq2PemL0_zbRsxEi_23V3-2v2MVvb0AsHOrEUI"
  userForm:FormGroup = new FormGroup({
      userName:new FormControl(''),
      city:new FormControl(''),
      DateOfJoining: new FormControl(''),
      photoFileName: new FormControl('')
    });
  ngOnInit(): void {
    this.userForm.setValue({
      userName:this.service.formData.userName,
      city:this.service.formData.city,
      DateOfJoining:this.service.formData.dateOfJoining,
      photoFileName:this.service.formData.photoFileName
    });

  }
  initializeForm(){
    this.userForm = new FormGroup({
      userName:new FormControl('Name',[Validators.required,Validators.maxLength(12)]),
      city:new FormControl('',Validators.required),
      DateOfJoining: new FormControl('',Validators.required),
      photoFileName: new FormControl('')
    });
  }



  onSubmit(form:FormGroup){
      this.service.formData.userName = this.userForm.get('userName')?.value;
      this.service.formData.city = this.userForm.get('city')?.value;
      this.service.formData.dateOfJoining = this.userForm.get('DateOfJoining')?.value;

    if(this.service.formData.userId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form:FormGroup){
    this.service.postUser().subscribe(
      res =>{
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted successfully','User Insert')
      },
      error => {
        console.log(error);
      }
    )
  }

  updateRecord(form:FormGroup)
  {
    this.service.putUser().subscribe(
      res =>{
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated successfully','User Update')
      },
      error => {
        console.log(error);
      }
    )

  }

  resetForm(form:FormGroup){
    form.reset();
    this.service.formData = new User();
    this.initializeForm();

  }

  uploadPhoto(event:any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.uploadPhoto(formData).subscribe((data:any)=>{
      this.userForm.patchValue({
        PhotoFileName:data.toString()
      })
      // this.PhotoFileName=data.toString();
      this.PhotoFilePath=this.service.photoUrl+data.toString();
    })
  }

}
