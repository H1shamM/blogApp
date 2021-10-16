import { Component, OnInit } from '@angular/core';
import {UsersService} from "../data/users.service";
import {User} from "../data/user.model";
import {ToastrService} from "ngx-toastr";
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent implements OnInit {

  constructor(public service:UsersService,private toastr:ToastrService,private router:Router)  { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/userRegister/login']);
  }

  updateUser(selectedUser:User){
    this.service.formData= Object.assign({},selectedUser);
  }

  onDelete(id:number)
  {
    if(confirm('Are you sure to delete this user?'))
    {
      this.service.deleteUser(id).subscribe(
        res => {
          this.service.refreshList();
          this.toastr.error("Deleted Successfully", "Delete User")
        },
        error => {
          console.log(error);
        }
      )
    }
  }

}
