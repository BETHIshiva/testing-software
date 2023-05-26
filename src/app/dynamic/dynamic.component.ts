
import { Component, ElementRef, OnInit ,ViewChild,VERSION, ViewChildren, QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {ServiceService} from 'src/service/service.service';
import { DropDownListComponent, highlightSearch } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBox, NumericTextBoxComponent, TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { FormArray, FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent  implements OnInit{
  [x: string]: any;
  public dropdata:any = [];
  public fields : any={'value':'id','text':'name'};
  public productFields:any={'value':'id','text':'name'}

  inputValue!:any;
  selectedDropValue!:any;
  public demoform!:FormGroup
  public values=false;
  public formValue=false;
  public submitted=false;
  @ViewChildren('dropdown',{read:DropDownListComponent})
  public dropdown!: QueryList<DropDownListComponent>
  @ViewChildren('textbox',{read:TextBoxComponent})
  public textbox!:QueryList<TextBoxComponent>
  @ViewChildren('numeric_Textbox',{read:TextBoxComponent})
  public numeric_Textbox!:QueryList<TextBoxComponent>
  @ViewChild('dropProduct')
  public dropProduct!:DropDownListComponent

  public dynamicData:any=[];
  public startArray:any=[];
  public isProduct:boolean=false;


  public datasource:any=[];
  public dropDatas:any=[];
  public buttonValue:any=[];
  public newArray :any=[];
  public array :any=[];
  userForm!: FormGroup;
  constructor(private fb:FormBuilder,private http: HttpClient,private demoservice:ServiceService){}

  formText:any=[];
  formDrop:any=[];
  data:any;
  value!:string;
  demoArray:any;

  ngOnInit(): void {
    this.demoform = this.fb.group({
      textbox:['',Validators.required],
      dropdown:['',Validators.required],
      NumericTextbox:['',Validators.required],

    })
    this.userForm = this.fb.group({
      users: this.fb.array([])
    })
    this.OnDisplay();
    this.onSelect();
    console.log('test')
  }
  OnSelectComp(){
    console.log(this.dropProduct.value);

    this.demoservice.starttest({'id':this.dropProduct.value}).subscribe(
    (data:any)=>
    {
      console.log(data);
      this.startArray=data
      this.isProduct=true;
      this.demoArray=data
    }







    )

  }
 adduser(){
  this.values=true;
    this.demoservice.adddetails().subscribe(
      (data:any)=>{
        this.dynamicData = data
        this.array=data
        console.log(data)})
 }
 onSelect(){
  this.demoservice.SelectProduct().subscribe(
    (data:any)=>{
      this.datasource=data;
      console.log(data)
    }
  )
 }
 body:any=[];
  dropArray:any=[];
  textboxArray:any=[];
  target:any=[];
  arr:any[]=[];
  targetArr:any=[];
  finalDrop:any=[];
  NumericArray:any=[];
  NumericText:any=[];
  onShow(){
    this.newArray.length=0;
    this.targetArr.length=0;
    this.finalDrop.length=0;
    this.NumericText.length=0;
    for(let k=0 ; k<this.dropdown.toArray().length;k++){
      console.log(this.dropdown.toArray()[k].text);
      let target = this.dropdown.toArray()[k].value
      // let target={
      //   id : this.dropdown.toArray()[k].text,
      //   value : this.dropdown.toArray()[k].value,

      // }
     this.newArray.push(target)
  }

   for(let k=0 ; k<this.dropdown.toArray().length;k++){
    let target = this.dropdown.toArray()[k].text
   this.finalDrop.push(target)
}
  for(let k=0 ; k<this.textbox.toArray().length;k++){
    let target = this.textbox.toArray()[k].value
    // let target={
    //   id : this.textbox.toArray()[k].value,
    //   value : this.textbox.toArray()[k].value,

    // }
   this.targetArr.push(target)
}
// NumericTextbox
for(let k=0 ; k<this.numeric_Textbox.toArray().length;k++){
  let target = this.numeric_Textbox.toArray()[k].value
 this.NumericText.push(target)
}
console.log(this.NumericText);

// console.log(this.targetArr);

  this.textboxArray=[];
this.NumericArray=[];
  this.dropArray=[]
  let k=0;
  let l=0;
  let m=0;
  console.log(this.demoArray)
  for(let i=0; i<=this.demoArray.length;i++){
//    console.log(this.array[i]?.['component_name']);
    if(this.demoArray[i]?.['component_name'] == 'Combobox'){
        let target = this.newArray
        let drop_value = this.finalDrop
        let body={
          component_name : this.demoArray[i]['component_name'],
          name : this.demoArray[i]['view_name'],
          outputfld:this.demoArray[i]['outputfld'],
          outputtbl:this.demoArray[i]['outputtbl'],
          value:target[k],
          dropText:drop_value[k]
        }

        this.dropArray.push(body)
        k++;

       }
      //  else if(this.array[i]?.['component_name'] == 'Textbox'){

      //   let target1 = this.targetArr
      //   console.log(target1)

      //   let body={
      //     component_name : this.array[i]['component_name'],
      //     name : this.array[i]['name'],
      //     outputfld:this.array[i]['outputfld'],
      //     outputtbl:this.array[i]['outputtbl'],
      //     value:target1[k]
      //   }
      //   // console.log(this.target[i]);
      //   console.log(body);

      //   this.textboxArray.push(body)
      //   k++;

      //   }else  if(this.array[i]?.['component_name'] == 'Textbox'){

      else  if(this.demoArray[i]?.['component_name'] == 'Textbox'){
      // console.log(this.targetArr)
      // let target = this.targetArr
      // console.log(this.targetArr[l]);
      let body={
        component_name : this.demoArray[i]['component_name'],
        name : this.demoArray[i]['view_name'],
        outputfld:this.demoArray[i]['outputfld'],
        outputtbl:this.demoArray[i]['outputtbl'],
        value:this.targetArr[l]
      }
      // console.log(body)
      this.textboxArray.push(body)
      l++;
      }else if(this.demoArray[i]?.['component_name'] == 'NumericTextbox'){
        let body={
          component_name : this.demoArray[i]['component_name'],
          name : this.demoArray[i]['view_name'],
          outputfld:this.demoArray[i]['outputfld'],
          outputtbl:this.demoArray[i]['outputtbl'],
          value:this.NumericText[m]
        }
        // console.log(body)
        this.NumericArray.push(body)
        m++;

      }
  }
  // console.log(this.target);
console.log(this.textboxArray);

  this.arr=[];
  this.arr = [...this.textboxArray,...this.NumericArray,...this.dropArray];
    console.log('arr')
    console.log(this.arr);
    let data={
      'data':this.arr
    }
    console.log(data);
    this.demoservice.onInsert(data).subscribe(
      res=>{
        console.log(res)

      }
    )






  }
public testArray:any=[]
  onAdd1(data:any,id:any){
    console.log(id)
        this.demoservice.onGetTexbox({'id':id }).subscribe(
          data=>{
            console.log(data)
            this.demoservice.onInsertBox({'id':id }).subscribe(
              (res:any)=>{
                console.log(res);
                this.testArray=res
                console.log(this.startArray);
                let index = -1;
                let x=-1;
                for(let i=0;i<=this.startArray.length;i++){

                  if(this.startArray[i]?.['component_name']=='Textbox' ){
                    ++index;
                    // if (this.dynamicData[i]?.['component_name'] === ) {
                        for (let k = 0; k < this.testArray.length; k++) {
                          if (this.testArray[k]['txtboxid'] == this.startArray[i]?.['id']) {
                            console.log(index);
                            this.textbox.toArray()[index].value=this.testArray[k]['textboxcomp']


                          }

                        }
                  }
                  else if(this.startArray[i]?.['component_name']=='NumericTextbox'){
                    ++x;
                    for (let j = 0; j < this.testArray.length; j++) {
                      if (this.testArray[j]['txtboxid'] == this.startArray[i]?.['id']) {
                        console.log(x);
                        // console.log(this.testArray[k]['textboxcomp']);

                        this.numeric_Textbox.toArray()[x].value=this.testArray[j]['textboxcomp']


                      }

                    }
                  }
                }

              }
            )
          }

        )



  }
  // onAdd2(id:any){

  // }



  displayArray:any=[];

  OnDisplay(){
    this.demoservice.onSelectGrid().subscribe(
      (re:any)=>{
        console.log(re)
        this.displayArray=re
      }
    )

  }




}
