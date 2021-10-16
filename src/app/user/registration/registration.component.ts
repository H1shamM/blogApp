import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserRegistrationService } from 'src/app/shared/user/user-registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service:UserRegistrationService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onSubmit(){
    this.service.register().subscribe(
      (res:any) =>{
        if(res.succeded){
          this.service.formModel.reset();
          this.toastr.success('New user created','Registration successfull');
        }
        else{
          res.errors.forEach((element: { code: any; description:any;}) => {
            switch (element.code) {
              case 'DublicatedUserName':
                this.toastr.error('UserName Already Taken','Registration Failed.')
                break;
            
              default:
                this.toastr.error(element.description,'Registration Failed.')
                break;
            }
            
          });
        }
      },
      err=>{
        console.log(err);
      }

    )
  }

}
