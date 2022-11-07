import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AppDefinitionsResourceService} from 'src/app/apiGenerator/api/appDefinitionsResource.service'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {
  listAllApps:any[]=[];

  constructor(
    private AppDefinitionsResourceService:AppDefinitionsResourceService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.getAllApplications()
  }

  getAllApplications(){
     // Get Applications
     this.AppDefinitionsResourceService.getAppDefinitions().subscribe(
      (res:any)=>{
        for(let item of res.data){
            // Make a filter on the applications that the user has added with flowable to not add the application: tasks / modeler / admin / idm
            if(item.defaultAppId == null){
              this.listAllApps.push(item)
            }
        }
      }
    )
  }

  onSelectApp(nameProcess:string){
    this.router.navigate([`/process/${nameProcess}`]);
  }















}



