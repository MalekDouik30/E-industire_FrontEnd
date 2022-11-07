import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {ProcessInstanceQueryResourceService} from 'src/app/apiGenerator/api/processInstanceQueryResource.service';
import {ProcessInstanceResourceService} from 'src/app/apiGenerator/api/processInstanceResource.service';
import {MatDialog} from '@angular/material/dialog';
import { TaskComponent } from '../task/task.component';



@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

  private routeSub: Subscription;
  private appName:String
  listInstanceProcess:any[]=[];

  constructor(
    private route: ActivatedRoute,
    private ProcessInstanceQueryResourceService:ProcessInstanceQueryResourceService,
    private ProcessInstanceResourceService : ProcessInstanceResourceService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getProcessNameFromUrl()
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
