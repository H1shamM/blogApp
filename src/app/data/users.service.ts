import { Injectable } from '@angular/core';
import {User} from "./user.model";
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {newArray} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) {}

  formData:User = new User();
  list:User[] = [];

  readonly  baseUrl = 'http://localhost:5000/api/User'
  readonly  photoUrl = 'http://localhost:5000/Photos/'
  tokenHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')});

  postUser(){
     return this.http.post(this.baseUrl,this.formData);
  }

  putUser(){
    return this.http.put(this.baseUrl+'/'+this.formData.userId,this.formData);
  }

  deleteUser(id:number){
    return this.http.delete(this.baseUrl+'/'+id);
  }

  refreshList(){
    this.http.get(this.baseUrl)
      .toPromise()
      .then(res => this.list = res as User[])
  }

  uploadPhoto(val:any)
  {
    return this.http.post(this.baseUrl+'/SaveFile',val);
  }
}
