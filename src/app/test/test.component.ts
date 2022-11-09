import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AppDefinitionsResourceService} from 'src/app/apiGenerator/api/appDefinitionsResource.service'
import { ProcessInstancesResourceService } from 'src/app/apiGenerator/api/processInstancesResource.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {
  listAllApps:any[]=[];

  constructor(
    private AppDefinitionsResourceService:AppDefinitionsResourceService,
    private router:Router,
    private ProcessInstancesResourceService:ProcessInstancesResourceService,
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

  onStartProcess(processDefinitionId:string,processName:string){

    const now = new Date();
    let CreateProcessInstanceRepresentation:any={}
    CreateProcessInstanceRepresentation.name= processName + '-' +now.toUTCString() ;
    CreateProcessInstanceRepresentation.processDefinitionId=processDefinitionId;

    this.ProcessInstancesResourceService.startNewProcessInstance(CreateProcessInstanceRepresentation).subscribe(res=>{
      console.log(res)
    },err=>{
      console.error(err)
    });

  }















}



