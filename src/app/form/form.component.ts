import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Console } from 'console';
import {RelatedContentResourceService} from 'src/app/apiGenerator/api/relatedContentResource.service';
import{TaskFormResourceService} from 'src/app/apiGenerator/api/taskFormResource.service'
import{CreateContentItemOnTaskRequest} from 'src/app/apiGenerator/model/createContentItemOnTaskRequest';


export interface JsonFormData {
  id: string
  name: string
  description: any
  key: string
  version: number
  fields: Field[]
  outcomes: any[]
  outcomeVariableName: any
}

export interface Field {
  fieldType: string
  id: string
  name: string
  type: string
  value: any
  required: boolean
  readOnly: boolean
  overrideId: boolean
  placeholder?: string
  layout: any
  params?: Params
  optionType: any
  hasEmptyValue: any
  options?: Option[]
  optionsExpression: any
}

interface Params {
  regexPattern?: string
  minLength?: string
  maxLength?: string
}

interface Option {
  id: any
  name: string
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  @Input() jsonFormData:JsonFormData;
  @Input() idTaskJsonComponent:string;
  @Input() idFormJsonComponent:string;

  public myForm: FormGroup = this.fb.group({});
  fd = new FormData();
  
  multistepsForm:any[]=[]
  stepFormList:any[]=[]
  multistepsFormList:any[]=[]

  disabled = true;
  active:Number;

  // Slider
  thumbLabel = true;
  valueSlider=0;
  // End Slider
  constructor(
    private fb: FormBuilder,
    private RelatedContentResourceService:RelatedContentResourceService,
    private TaskFormResourceService:TaskFormResourceService,
    private http:HttpClient,   
 ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    
    if(changes['jsonFormData'] && this.jsonFormData){
      this.createForm(this.jsonFormData.fields);
    }
  }

  createForm(controls: Field[]){
    this.multistepsFormList=[]
    for(const i of controls){
      const validatorsToAdd = [];
     
      if(i.type=='integer'){
        i.type='number'
      }
      if(i.type=='decimal'){
        i.type='number'
      }
      if(i.type=='multi-line-text'){
        i.type='textarea'
      }
      if(i.type=='boolean'){
        i.type='checkbox'
      }
      if(i.type =='radio-buttons'){
        i.type='radio'
      }

      if(i.params!=null){
       for (const [key, value] of Object.entries(i.params )) {
        switch (key) {
          case 'minLength':
          validatorsToAdd.push(Validators.minLength(value));
          break;
        case 'maxLength':
          validatorsToAdd.push(Validators.maxLength(value));
          break;
        case 'regexPattern':
          validatorsToAdd.push(Validators.pattern(value));
          break;
        }
       }
      }
      this.myForm.addControl(
        i.id,this.fb.control(i.value,validatorsToAdd) 
      );

      // Multisteps Forms :
      if(i.type!='horizontal-line'){
        this.stepFormList.push(i)
      }

      if(i.type =='horizontal-line'){
        this.multistepsFormList.push(this.stepFormList)
        this.stepFormList=[]
      }
    }
    console.log( this.multistepsFormList)
    console.log(this.multistepsFormList.length)

  }

  onSubmit(){
    let bodyRequest:any = <any><unknown>{
      values: this.myForm.value,
      formId: this.idFormJsonComponent
    }
    this.TaskFormResourceService.completeTaskForm(this.idTaskJsonComponent,bodyRequest).subscribe(
      res=>{
        console.log("Form uploaded !")
      },err=>{
        console.log(err)
      }
    )
  }


  onUploadFile(event:any,inputName:any){
    /*
    let myFile=  new File([""], event.target.files[0]);
    this.RelatedContentResourceService.createTemporaryRawContentItem({file:myFile}).subscribe(res=>{
      console.log("File uploaded succefuly")
    },err=>{
      console.log("")
    });
    */
    var myFile2 = new FormData();
    myFile2.append('file', event.srcElement.files[0]);

    console.log(this.myForm)

    this.serviceUploadFile(myFile2).subscribe((res:any)=>{
      this.myForm.value[inputName]= res.id;

      console.log(this.myForm.value)
      console.log(this.myForm.value[inputName])

    },err=>{
      console.log(err)
    })
  }

  readFile(idDocument:string){
    this.RelatedContentResourceService.getContent(idDocument).subscribe((res:any)=>{
      var imageUrl = URL.createObjectURL(res)
      imageUrl=imageUrl.replace('4200','8080')
      open(imageUrl)
    })
  }


  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.active = 1;
    }
  }


  serviceUploadFile(file:any){
   return this.http.post("http://localhost:8080/app/rest/content/raw",file)
  }




}
