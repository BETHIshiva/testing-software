import { Component, OnInit, TemplateRef } from '@angular/core';


import { ViewChild,VERSION, ViewChildren, QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {ServiceService} from 'src/service/service.service';
import { DropDownListComponent, highlightSearch } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBox, NumericTextBoxComponent, TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { FormArray, FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GridComponent, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';


@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
  demoform!: FormGroup;
  userForm!: FormGroup;
  datasource: any=[];
  datasource1!:any;
  headerD1!:any;
  public dropDownOutputField:any="";
  public selecterParamList: any;
  public post:any={id:null}
  public productFields:any={'value':'id','text':'name'}
  public MandatoryFields:any={'value':'id','text':'view_name'};
  public FieldsText:any={'value':'id','text':'view_name'};
  public dropProductData: any=[];
  @ViewChild('grid')public grid!:GridComponent;
  @ViewChild('addTable') public addTable !:TemplateRef<any>;
  @ViewChild('addTable1') public addTable1 !:TemplateRef<any>;
  @ViewChild('dropComponentButtonName') public dropComponentButtonName!:DropDownListComponent;
  @ViewChild('dropTextboxName') public dropTextboxName!:DropDownListComponent;
  @ViewChild('textboxComponentName') public textboxComponentName!:TextBoxComponent;
  @ViewChild('numerictextboxSMG') public numerictextboxSMG!:TextBoxComponent;
  @ViewChild('numerictextboxPoll') public numerictextboxPoll!:TextBoxComponent;
  @ViewChild('numerictextboxMF') public numerictextboxMF!:TextBoxComponent;
  datasource2: any;
  dropValueButton: any;
  DropdownTextboxName: any;
  data1: any;


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

      this.demoservice.forSelectGrid({'id':this.post.id}).subscribe(
        (data:any)=>{
          console.log(data);
          this.datasource1=data.data;
          this.headerD1=data.fields;
          console.log(this.datasource1)
        }
      )



     }
     openDialog(){
      console.log(this.headerD1?.length)
      if(this.headerD1?.length>0){
        this.onDropdownButtonName();
        this. onDropdownTextboxName();
        const dialogRef3 = this.dialog.open(this.addTable,{
          width:'400px',
          height:'500px'
          });


          dialogRef3.afterClosed().subscribe((result: any) => {
            console.log(`Dialog result: ${result}`);
          });
        }else{
          alert("please choose a product type")
        }


    }
    openDialog2(){
      console.log(this.headerD1.length)
        const dialogRef4 = this.dialog.open(this.addTable1,{
          width:'400px',
          });


          dialogRef4.afterClosed().subscribe((result: any) => {
            console.log(`Dialog result: ${result}`);
          });


    }
    onDropdownButtonName(){
      this.demoservice.forDropdownButtonName().subscribe(
        (data:any)=>{
          this.dropValueButton=data;
          console.log(data);

        }
      )
    }

    onDropdownTextboxName( ){
      this.demoservice.forDropdownTextboxName({'id':this.post?.id,'buttonid':this.data1}).subscribe(
      (data:any)=>{
        console.log(this.post.id);
        console.log(this.data1)
        this.DropdownTextboxName=data;
        console.log(data)
      }
      )
    }

    onInsertVAlues(){
      console.log(this.post.id);
      console.log(this.dropComponentButtonName.value);
      console.log(this.dropTextboxName.value);
      console.log(this.textboxComponentName.value);
      console.log(this.numerictextboxSMG?.value);
      console.log(this.numerictextboxPoll?.value);
      console.log(this.numerictextboxMF?.value);
      let post = {'component_id':this.dropComponentButtonName.value,'adress':this.numerictextboxPoll.value,'mf_value':this.numerictextboxMF.value,'smg_ip':this.textboxComponentName.value,'smg_port':this.numerictextboxSMG.value,'txtboxid':this.dropTextboxName.value};
        this.demoservice.forInsertAction(JSON.parse(JSON.stringify(post))).subscribe((data:any)=> {
        console.log(data);
        this.selectHandler(this.post.id);
        // this.grid.refresh()
      })




    }
    rowSelected(args: RowSelectEventArgs) {
      // let selectedrowindex: number[] = this.grid.getSelectedRowIndexes();  // Get the selected row indexes.
      // alert(selectedrowindex); // To alert the selected row indexes.
      // let  selectedrecords: any = this.grid.getSelectedRecords();
      // console.log(selectedrecords[0].Table) // Get the selected records.
      //  this.data1=selectedrecords[0].Table
       // Get the selected row indexes.
        console.log('grid');

        let selectedrecords: any[] = this.grid.getSelectedRecords();
        this.data1=selectedrecords[0]['id'];
        console.log(selectedrecords[0]['id']);

      //   console.log(selectedrecords[0].Table) // Get the selected records.
      //  this.data1=selectedrecords[0].Table
      //  console.log('this.data1 ', this.data1);
      //  this.column_data.id=this.data1




  }
  onDelete(){
    this.demoservice.forDeleteAction({'id':this.data1}).subscribe(
      (data:any)=>
      {
        console.log(this.data1);
        console.log(data);
        this.post?.id
        this.selectHandler(this.post?.id);
        this.grid.refresh()


      }
      )


  }





}
