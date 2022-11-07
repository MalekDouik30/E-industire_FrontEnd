import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import{ RemoteAccountResourceService } from 'src/app/apiGenerator/api/remoteAccountResource.service';
import { MyServiceService } from '../service/my-service.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userConnected:string
  testAdmin:boolean

  constructor(
    private toastr: ToastrService,
    private RemoteAccountResourceService:RemoteAccountResourceService,
    private myService:MyServiceService,
    private router: Router

    ) { }

  ngOnInit(): void {
        // Get User Authenticated Information
        this.RemoteAccountResourceService.getAccount().subscribe(
          (res:any)=>{
            this.userConnected = res.firstName + " " + res.lastName
    
              for(let item of res.privileges){
                if(item == "access-modeler"){
                  this.testAdmin=true
                }
              }      
          },err=>{
            this.toastr.error('Please check the connection with the server','Connection failed');
          }
        )
  }

  logout(){
    this.myService.logOut().subscribe(
      res=>{
       window.location.reload();
       console.log("Logout sucessfully")
      }
    )
  }

  onHomePage(){
    this.router.navigate(['/test'])

  }

}
