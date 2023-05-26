import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePickerComponent, DateRangePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { ServiceService } from 'src/service/service.service';

@Component({
  selector: 'app-gridview',
  templateUrl: './gridview.component.html',
  styleUrls: ['./gridview.component.css']
})
export class GridviewComponent implements OnInit {
  // public month: number = new Date().getMonth();
  // public fullYear: number = new Date().getFullYear();
  // public start: Date = new Date(this.fullYear, this.month - 1 , 7);
  // public end: Date = new Date(this.fullYear, this.month, 25);
  public productFields:any={'value':'id','text':'name'}
  @ViewChild('dropProduct') dropProduct!:DropDownListComponent;
  @ViewChild('datePicker') datePicker!:DateRangePickerComponent;
  demoform: any;
  userForm: any;
  datasource: any=[];
  datasource1: any;
  headerD1: any;
  public post:any={id:null};
  angularValue: any;
  datasourcegrid: any;
  datasourceGridCol: any;
  constructor(public dialog: MatDialog,private fb:FormBuilder,private http: HttpClient,private demoservice:ServiceService) { }

  ngOnInit(): void {
    this.demoform = this.fb.group({

      dropdown:['',Validators.required],


    })
    this.userForm = this.fb.group({
      users: this.fb.array([])
    })
    this.onSelectProductType();
  }
  onSelectProductType(){
    this.demoservice.forProductTypeAction().subscribe(
      (data:any)=>
      {
        this.datasource=data;
        // this.headerD1=data;
        console.log(data);

      })

  }
  selectHandler(data?: any) {
    console.log(data);
    this.post.id=data;
    // console.log('payload select table grid',data.value)

      // this.demoservice.forselectGridpage({'id':this.post.id}).subscribe(
      //   (data:any)=>{
      //     console.log(data);
      //     this.datasource1=data.data;
      //     this.headerD1=data.fields;
      //     console.log(this.datasource1)
      //   }
      // )



     }

time:any;
  OnShowGrid(){
    let  time=this.angularValue
      console.log(this.dropProduct.value);
      // console.log(this.datePicker.value);
      if(Array.isArray(this.datePicker.value)){
        console.log(this.datePicker.value[0]);
       let  dataTime=this.datePicker.value[0]
        console.log(this.datePicker.value[1]);
        var event = new Date(this.datePicker.value[0]);

let date = JSON.stringify(event)
date = date.slice(1,11)
console.log(date) ;



      }
    this.demoservice.forselectGridpage({'id':this.post.id}).subscribe(
      (data:any)=>{
        this.datasourcegrid=data;
        this.datasourceGridCol=data;
        console.log(data);

      }
    )

  }







}
function convert(arg0: string): any {
  throw new Error('Function not implemented.');
}

