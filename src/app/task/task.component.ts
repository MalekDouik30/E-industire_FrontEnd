import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import {TaskQueryResourceService} from 'src/app/apiGenerator/api/taskQueryResource.service';
import{TaskFormResourceService} from 'src/app/apiGenerator/api/taskFormResource.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  private idInstanceProcess:string;
  private listTask:any[]=[];
  nameTask:string;
  flowableForm:any;
  idForm:any;
  idTask:string;


  constructor(    
    private TaskQueryResourceService:TaskQueryResourceService,
    public dialog: MatDialog,
    private TaskFormResourceService:TaskFormResourceService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.idInstanceProcess = this.data.idInstanceProcessSelected
    this.getCurrentTask()
  }

  getCurrentTask(){
  // Get Current Task
  this.TaskQueryResourceService.listTasks({processInstanceId:  this.idInstanceProcess}).subscribe(
    (res:any)=>{
      this.listTask=[];
      this.listTask.push(res.data);
      for(let item of res.data){
        this.getForm(item.id)
        this.idTask = item.id;
        this.nameTask=item.name;
      }
    }
  )
  }

  getForm(idTask:string){
    this.TaskFormResourceService.getTaskForm(idTask).subscribe(
      res=>{
        this.flowableForm = res;
        this.idForm=res.id;
      }
    )
  }






}
