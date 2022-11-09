import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import{TaskFormResourceService} from 'src/app/apiGenerator/api/taskFormResource.service';

@Component({
  selector: 'app-formly',
  templateUrl: './formly.component.html',
  styleUrls: ['./formly.component.css']
})
export class FormlyComponent implements OnInit {

  constructor(
    private TaskFormResourceService:TaskFormResourceService,
  ) { }

  @Input() myJsonFormData:any;
  @Input() myIdFormJson:string;
  @Input() idTaskJson:string;
  


  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [];



  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes['myJsonFormData'] && this.myJsonFormData){
     this.createForm(this.myJsonFormData.fields);
    }
  }

  initInput(idInput:string,nameInput:string,typeInput:string,placeholderInput:string,requiredInput:boolean,inputValue:string,typeLocalInput?:string){
    let inputObject={
      key: idInput,
      type: typeInput,
      defaultValue: inputValue,
      templateOptions: {
        label: nameInput,
        placeholder: placeholderInput,
        required: requiredInput,
        type:typeLocalInput
      }
    };
    return inputObject
  }

  selectWithRadioInput(idInput:string,nameInput:string,typeInput:string,placeholderInput:string,requiredInput:boolean,optionsInput:any[],inputValue:string){
    let inputObject={
      key: idInput,
      type: typeInput,
      defaultValue: inputValue,
      templateOptions: {
        label: nameInput,
        placeholder:placeholderInput,
        required: requiredInput,
        options: optionsInput,
      },
    };
    return inputObject
  }

  createForm(jsonFields:any){
    this.fields=[]
    for(const item of jsonFields){
      // Text type
      if(item.type=='text' || item.type=='expression' ){ 
        let inputObject = this.initInput(item.id,item.name,'input',item.placeholder,item.required,item.value)
        this.fields.push(inputObject)
      }

      // Text password 
      if(item.type=='password'){ 
        let inputObject = this.initInput(item.id,item.name,'input',item.placeholder,item.required,item.value,'password')
        this.fields.push(inputObject)
      }

      // Date type
      if(item.type=='date'){ 
        let inputObject = this.initInput(item.id,item.name,'input',item.placeholder,item.required,item.value,'date')
        this.fields.push(inputObject)
      }

      // text area type
      if(item.type =='multi-line-text'){
        let inputObject = this.initInput(item.id,item.name,'textarea',item.placeholder,item.required,item.value)
        this.fields.push(inputObject)
      }

      // number type
      if(item.type=='integer' || item.type=='decimal' ){ 
        let inputObject = this.initInput(item.id,item.name,'number',item.placeholder,item.required,item.value)
        this.fields.push(inputObject)
      }

      // DropDown type
      if(item.type=='dropdown'){ 
        let option:any[]=[];
        // Change the form options of flowable to match formly
        for(let i of item.options){
          let typeOptionFormly={ label: '', value: '' };
          typeOptionFormly.label = i.name;
          typeOptionFormly.value = i.name;
          option.push(typeOptionFormly)
        }
        let inputObject = this.selectWithRadioInput(item.id,item.name,'select',item.placeholder,item.required,option,item.value)
        this.fields.push(inputObject)
      }

      // Radio-Buttons type
      if(item.type == 'radio-buttons'){ 
        let option:any[]=[];
        // Change the form options of flowable to match formly
        for(let i of item.options){
          let typeOptionFormly={ label: '', value: '' };
          typeOptionFormly.label = i.name;
          typeOptionFormly.value = i.name;
          option.push(typeOptionFormly)
        }
        let inputObject = this.selectWithRadioInput(item.id,item.name,'radio',item.placeholder,item.required,option,item.value)
        this.fields.push(inputObject)
      }
      
      this.fields.push()
    }
  }
  

  onSubmit(model:any) {
    let bodyRequest:any = <any><unknown>{
      values: model,
      formId: this.myIdFormJson
    }


    this.TaskFormResourceService.completeTaskForm(this.idTaskJson,bodyRequest).subscribe(
      res=>{
        console.log("Form uploaded successfully !")
      },err=>{
        console.log(err)
      }
    )
  

  }

}
