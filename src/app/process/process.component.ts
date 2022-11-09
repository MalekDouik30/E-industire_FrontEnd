import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {ProcessInstanceQueryResourceService} from 'src/app/apiGenerator/api/processInstanceQueryResource.service';
import {ProcessInstanceResourceService} from 'src/app/apiGenerator/api/processInstanceResource.service';
import {MatDialog} from '@angular/material/dialog';
import { TaskComponent } from '../task/task.component';


import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

  private routeSub: Subscription;
  private appName:String
  listInstanceProcess:any[]=[];

  listDefinitionKeysOfTasksHaveSpecificTreatment=["sid-8C6A7C7F-88E4-4FA1-9180-93575E857BD1"];
  listTaskSpecificTreatment:any[]=[];

  constructor(
    private route: ActivatedRoute,
    private ProcessInstanceQueryResourceService:ProcessInstanceQueryResourceService,
    private ProcessInstanceResourceService : ProcessInstanceResourceService,
    public dialog: MatDialog,
    private http:HttpClient,
    ) { }

  ngOnInit(): void {
    this.getProcessNameFromUrl()
    this.getSpecificTreatment()
  }


  // Move to services
  getActiveTasksService(){
    return this.http.post("http://localhost:8080/admin-app/rest/admin/tasks",{size: 100000000, order: "asc", sort: "name",finished: "false", processVariables: [], taskVariables: []});
  }

  getSpecificTreatment(){
    // get tasks that have specific processing
    this.getActiveTasksService().subscribe((res:any)=>{
      for(let item of res.data){
        for(let item2 of this.listDefinitionKeysOfTasksHaveSpecificTreatment){
          if(item.taskDefinitionKey == item2){
            this.listTaskSpecificTreatment.push(item);
          }
        }
      }
    })
  }

  deleteProcessFromList(listInstanceProcess:any[]){
    // Remove the processes from list that are blocked in the task that requires a specific processing

    return listInstanceProcess;
  }


  getProcessNameFromUrl(){
    // Get the name of process from URL
    this.routeSub = this.route.params.subscribe(params => {
      this.getProcessInstacesDefinitions(params['nameProcess']);
     });
  }

  getProcessInstacesDefinitions(nameProcessKey:string){
    this.listInstanceProcess=[];
    this.ProcessInstanceQueryResourceService.getProcessInstances( {sort: "created-desc", page: 0, appDefinitionKey: nameProcessKey, state: "running"}).subscribe(
      (res:any)=>{
        for(let item of res.data){
          this.listInstanceProcess.push(item);
        }
      }
    )
  }


  onDeleteProcessInstance(processInstanceId:string){
    this.ProcessInstanceResourceService.deleteProcessInstance(processInstanceId).subscribe(res=>{
    // Refresh page after deletion process
      window.location.reload()
    })
  }


  openTaskForm(id:string){
   this.dialog.open(TaskComponent,{
     autoFocus: false,
     maxHeight: '90vh',
     data: {
      idInstanceProcessSelected: id,
    },
   });
  }


 










}
