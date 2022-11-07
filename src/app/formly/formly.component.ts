import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';

@Component({
  selector: 'app-formly',
  templateUrl: './formly.component.html',
  styleUrls: ['./formly.component.css']
})
export class FormlyComponent implements OnInit {

  constructor() { }
  @Input() myJsonFormData:any;


  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [];


  
   select_radioObject={
    key: '',
    type: '',
    props: {
      label: '',
      placeholder: '',
      required: false,
      options: [
      ],
    },
  };

   headlineObject={
    fieldGroupClassName:'row',
    template:''
  }


  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes['myJsonFormData'] && this.myJsonFormData){
   
     //console.log("Flowable form")
     //console.log(this.myJsonFormData.fields)
     //console.log("*************************************")
     //console.log("formly")
     //console.log(this.fields)
     this.createForm(this.myJsonFormData.fields);
    }
  }

  initInput(idInput:string,nameInput:string,typeInput:string,placeholderInput:string,requiredInput:boolean,typeLocalInput?:string){
    let inputObject={
      key: idInput,
      type: typeInput,
      templateOptions: {
        label: nameInput,
        placeholder: placeholderInput,
        required: requiredInput,
        type:typeLocalInput
      }
    };
    return inputObject
  }

  selectWithRadioInput(idInput:string,nameInput:string,typeInput:string,placeholderInput:string,requiredInput:boolean,optionsInput:any[]){
    let inputObject={
      key: idInput,
      type: typeInput,
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
      if(item.type=='text'){ 
        let inputObject = this.initInput(item.id,item.name,'input',item.placeholder,item.required)
        this.fields.push(inputObject)
      }

      // Text password 
      if(item.type=='password'){ 
        let inputObject = this.initInput(item.id,item.name,'input',item.placeholder,item.required,'password')
        this.fields.push(inputObject)
      }

      // Date type
      if(item.type=='date'){ 
        let inputObject = this.initInput(item.id,item.name,'input',item.placeholder,item.required,'date')
        this.fields.push(inputObject)
      }

      // text area type
      if(item.type =='multi-line-text'){
        let inputObject = this.initInput(item.id,item.name,'textarea',item.placeholder,item.required)
        this.fields.push(inputObject)
      }

      // number type
      if(item.type=='integer' || item.type=='decimal' ){ 
        let inputObject = this.initInput(item.id,item.name,'number',item.placeholder,item.required)
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
        let inputObject = this.selectWithRadioInput(item.id,item.name,'select',item.placeholder,item.required,option)
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
        let inputObject = this.selectWithRadioInput(item.id,item.name,'radio',item.placeholder,item.required,option)
        this.fields.push(inputObject)
      }





      




      console.log(this.fields)








      console.log(item)
      this.fields.push()
    }


  }
  

  onSubmit(model:any) {
    console.log(model);
  }

}
