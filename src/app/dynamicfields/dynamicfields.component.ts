import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns/src/drop-down-list/dropdownlist.component';
import { GridComponent, PageSettingsModel,RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { ServiceService } from 'src/service/service.service';
import { TreeGridComponent , extendArray  } from '@syncfusion/ej2-angular-treegrid';
@Component({
  selector: 'app-dynamicfields',
  templateUrl: './dynamicfields.component.html',
  styleUrls: ['./dynamicfields.component.css']
})
export class DynamicfieldsComponent implements OnInit {
  datasource:any=[];
  DropMasterSource:any=[];
  DropMandatorySource:any=[];
  DropDisableSource:any=[];
  hasMasterValue:any=[];
  public DropColumnNumber:any=[1,2,3];
  public productFields:any={'value':'id','text':'name'}
  public masterField:any;
  public ComponentTypes:any = ['Combobox','Textbox','NumericTextbox','Button'];
  public value: string = 'NA';
  public MandatoryFields:any={'value':'id','text':'name'}
  public isDisable:any={'value':'id','text':'name'}
  // public outputFieldDrop:any=['param1','param2','Tparam1','Tparam2','Tparam3','Tparam4','param3','param4','Fparam1','Fparam2','Fparam3','param5','Fparam4','Fparam5','Fparam6','Tparam5','param6','param7','Fparam7','Fparam8','Fparam9','param8','Fparam10','Fparam11','Tparam6','Fparam12','Fparam13','Tparam7','Fparam14','Fparam15','Fparam16','Fparam17','Tparam8','Fparam18','Fparam19','param9','Fparam20','Fparam21','Fparam22','Fparam23','param10','Fparam24','Fparam25','Fparam26','Fparam27','param11'];
  public outputFieldDrop:any=[];
  NumericTextbox:any;

  demoform: any;
  userForm: any;

  @ViewChild('dropProduct')
  public dropProduct!:DropDownListComponent;
  @ViewChild('dropMaster')
  public dropMaster!:DropDownListComponent;
  @ViewChild('dropMandatory')
  public dropMandatory!:DropDownListComponent;
  @ViewChild('DropDisable')
  public DropDisable!:DropDownListComponent;
  @ViewChild('dropComponentType')
  public dropComponentType!:DropDownListComponent;
  @ViewChild('hasMaster')
  public hasMaster!:DropDownListComponent;

  @ViewChild('numerictextboxRow')
  public numerictextboxRow!:TextBoxComponent;
  @ViewChild('numerictextboxCol')
  public numerictextboxCol!:TextBoxComponent;
  @ViewChild('textboxComponentName')
  public textboxComponentName!:TextBoxComponent;

  @ViewChild('dropOutputField')
  public dropOutputField!:DropDownListComponent;

  @ViewChild('grid')
  public grid!:GridComponent;
  @ViewChild('addTable') public addTable !:TemplateRef<any>;
  @ViewChild('addTable1') public addTable1 !:TemplateRef<any>;

  public dropProductData: any=[];
  headerD1: any;
public post:any={id:null}
public tableDialog !:MatDialogRef<any>
Numerictextbox: any;
CompTypeValue:any;
Textbox:any;
Combobox:any;
NA:any;
public dropDownOutputField:any="";

public selecterParamList: any;
  data1: any;


  constructor(public dialog: MatDialog,private fb:FormBuilder,private http: HttpClient,private demoservice:ServiceService) { }

  ngOnInit(): void {
    this.demoform = this.fb.group({

      dropdown:['',Validators.required],


    })
    this.userForm = this.fb.group({
      users: this.fb.array([])
    })
    this.onDropdownSelect();
    this.onDropMaster();
    this.onMandatoryDrop();
    this.onIsDisableDrop();
    this.onHasMaster();

    // this.onFieldTable();
    // this.onFieldTable();

  }
  onDropMaster(){

  }
  onFieldTable(){
    this.demoservice.forFieldsTable({'id':this.post.id}).subscribe(
      (data:any)=>{
        this.outputFieldDrop=data;
        console.log(data)
      }
    )
  }
  onMandatoryDrop(){
    this.demoservice.forMandatory().subscribe(
      (rest:any)=>{
        this.DropMandatorySource=rest
        console.log(rest)

      }
    )
  }
  onIsDisableDrop(){
    this.demoservice.forDisable().subscribe(
      (rest:any)=>{
        this.DropDisableSource=rest
        console.log(rest)

      }
    )
  }
  onHasMaster(){
    this.demoservice.forHasMaster().subscribe(
      (rest:any)=>{
        this.hasMasterValue=rest
        console.log(rest)

      }
    )

  }
  onDropdownSelect(){
    this.demoservice.ondynamicTablefields().subscribe(
      (data:any)=>
      {
        this.datasource=data;
        console.log(data);

      })

  }
  onDropValue(data:any){

console.log(data)
// if(this.dropProduct?.value !=null){
// console.log(this.dropProduct.value)
  // this.demoservice.ondynamicTableDropValue({'id':this.dropProduct?.value}).subscribe(

  //   (data:any)=>{
  //     console.log('test')
  //     this.dropProductData=data;
  //     this.headerD1=data;
  //     console.log(data)
  //   }
  // )
// }
  }
  selectHandler(data?: any) {
console.log(data);
this.post.id=data;
// console.log('payload select table grid',data.value)
this.demoservice.ondynamicTableDropValue({'id':this.post.id}).subscribe((res:any)=>{
      this.dropProductData=res.data;
      this.headerD1=res.fields;
      this.dropDownOutputField=res.data[0].outputfld;
      console.log(res.data[0].outputfld)
      console.log('aaaa ', res)
      this.selecterParamList = res.data;
    }
  )



 }
 showData()
    {
     let dropValue=this.dropProduct?.value;
     console.log(dropValue);

   //Access both elements here by DOM properties
    }


    openDialog(){
      this.onFieldTable();

      console.log('this.outputFieldDrop ', this.outputFieldDrop);
      this.selectedComType(this.data);
      if(this.headerD1?.length>0){

        const dialogRef3 = this.dialog.open(this.addTable,{
          width:'400px',
          height:'500px'
          });


          dialogRef3.afterClosed().subscribe((result: any) => {
            console.log(`Dialog result: ${result}`);
          });
      }
      else{
        alert("please choose product type")
      }

    }
  data(data: any) {
    throw new Error('Method not implemented.');
  }
    openDialog3(){
      const dialogRef4 = this.dialog.open(this.addTable1,{
        width:'400px'
        });


        dialogRef4.afterClosed().subscribe((result: any) => {
          console.log(`Dialog result: ${result}`);
        });

    }
    selectedComType(data:any){
      // console.log(data.re)
      if(data.value=='Combobox'){
        this.demoservice.forMasterTable().subscribe(
          (re:any)=>{
            console.log(re)
            this.DropMasterSource=re;
            this.masterField={'value':'Table','text':'Table'};

          }
        )
      }
      else{
          this.DropMasterSource=[{'id':0, "text":'NA'}];

      }
    }


   id!:Number;
    rowSelected(args: RowSelectEventArgs) {
      // let selectedrowindex: number[] = this.grid.getSelectedRowIndexes();  // Get the selected row indexes.
      // alert(selectedrowindex); // To alert the selected row indexes.
      // let  selectedrecords: any = this.grid.getSelectedRecords();
      // console.log(selectedrecords[0].Table) // Get the selected records.
      //  this.data1=selectedrecords[0].Table
       // Get the selected row indexes.

        let selectedrecords: any[] = this.grid.getSelectedRecords();
        this.data1=selectedrecords[0]['id'];
        console.log(selectedrecords[0]['id']);

      //   console.log(selectedrecords[0].Table) // Get the selected records.
      //  this.data1=selectedrecords[0].Table
      //  console.log('this.data1 ', this.data1);
      //  this.column_data.id=this.data1




  }
    onDelete(){
      this.demoservice.ForDeleteGrid({'id':this.data1}).subscribe(
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

    OnCreateComponent(){
      console.log(this.dropProduct?.value);
      console.log(this.dropComponentType.value);
      console.log(this.textboxComponentName.value);
      console.log(this.dropMaster.text);
      // console.log(this.hasMaster.value)
      console.log(this.dropMandatory.value);
      console.log(this.DropDisable.value);
      console.log(this.numerictextboxRow.value);
      console.log(this.numerictextboxCol.value);
      console.log(this.dropOutputField.text);

     this.demoservice.forInsertValues({'Product_type':this.dropProduct?.value,'type':this.dropComponentType.value,'name':this.textboxComponentName.value,'master':this.dropMaster.text,'mandatory':this.dropMandatory.value,'disable':this.DropDisable.value,'row':this.numerictextboxRow.value,'col':this.numerictextboxCol.value,'outputtable':'outputtable','field':this.dropOutputField.text}).subscribe(
      (data:any)=>{
        console.log(data);
        if(data==1){
          alert("added succesfully");
          this.post.id
        this.selectHandler(this.post.id)
        // this.onDropdownSelect();
        this.grid.refresh()
        }else{
          alert("not added  and recheck the values of rows & columns")
        }



        }

     )

     }




    }



