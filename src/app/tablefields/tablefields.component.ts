import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { ServiceService } from 'src/service/service.service';
import { EditSettingsModel, GridComponent, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  'en-US': {
      grid: {
          'SaveButton': 'Submit',
          'CancelButton': 'Discard'
      }
  }
});

@Component({
  selector: 'app-tablefields',
  templateUrl: './tablefields.component.html',
  styleUrls: ['./tablefields.component.css']
})
export class TablefieldsComponent implements OnInit {
  public data!: object[];
  public editSettings!: EditSettingsModel;
  public toolbar!: ToolbarItems[];
  public orderIDRules!: object;
  public customerIDRules!: object;
  public datasource:any=[];
  public fileds:any={'value':'Table','text':'Table'};
  @ViewChild('dropfields')
  public dropfields!:DropDownListComponent;
  @ViewChild('GRID')
    public GRID!: GridComponent;
  demoform: any;
  userForm: any;
  datasource1: any;
  args: any;
  referencemasterPayload: any;
  refperiod: any;
  deleted!: object[];
  columns: any;
  editData: any;
  idValue: any;
  public postDropdown:any={value:null}
  constructor(private fb:FormBuilder,private http: HttpClient,private demoservice:ServiceService) { }

  ngOnInit(): void {
    this.demoform = this.fb.group({

      dropdown:['',Validators.required],


    })
    this.userForm = this.fb.group({
      users: this.fb.array([])
    })
    this.getdropTable();
    this.data = this.data;
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        this.orderIDRules = { required: true };
        this.customerIDRules = { required: true, minLength: 3 };
  }
  selectHandler(data:any){
    console.log(data);
    this.postDropdown.value=this.dropfields?.value
    this.demoservice.onSelecttable({'value':this.postDropdown.value}).subscribe(
      (data:any)=>{

        this.datasource1=[];
        this.datasource1=data.data;
        this.dummuyD1=data;
        console.log(data.fields)
        this.headerD1=data.fields;
    // this.headerD1 = Object.keys(this.dummuyD1?.[0] )
console.log(this.headerD1);
      }
    )

  }


  getdropTable(){
    this.demoservice.ongetTablefields().subscribe(
      (data:any)=>
      {
        this.datasource=data;
        console.log(data);
      })
  }
  public headerD1:any=[];
  public dummuyD1:any=[]
  onSelectedDrop(){
//     this.postDropdown.value=this.dropfields?.value




//     this.demoservice.onSelecttable({'value':this.postDropdown.value}).subscribe(
//       (data:any)=>{

//         this.datasource1=[];
//         this.datasource1=data.data;
//         this.dummuyD1=data;
//         console.log(data.fields)
//         this.headerD1=data.fields;
//     // this.headerD1 = Object.keys(this.dummuyD1?.[0] )
// console.log(this.headerD1);
//       }
//     )
  }
  public dummuyD2:any=[]
  public headerD2:any=[];
actionComplete(args:any) {
 console.log(args.requestType)
 console.log(args);
    if (args.requestType == 'save' && args.action == 'add' ) {
       console.log('this is add')
    this.dummuyD2=args.data
    delete this.dummuyD2['id'];
    console.log(this.dummuyD2);
    let value:any= Object.values(this.dummuyD2)
    let columns:any=Object.keys(this.dummuyD2)
    console.log(columns);
     console.log(this.dummuyD2)
      this.demoservice.onInsertrows({'table':this.dropfields?.value,'columns':columns,'texts':value}).subscribe(
        (data:any)=>{
          console.log(data);
          if(data==1){
            alert('Added successfully')
            this.postDropdown.value
            this.onSelectedDrop();
            this.GRID.refresh();

          }
          else
            alert('Data not Added')
            this.GRID.refresh();
            this.postDropdown.value
            this.onSelectedDrop();
        }
      )
    }

   else if (args.requestType == 'save' && args.action == 'edit') {
      console.log(args)
      console.log('this is edit')
      console.log(args.rowData['id']);
      this.editData=args.data;
      delete this.editData['id'];
      let value:any= Object.values(this.editData)
      console.log(value);
      let columns:any=Object.keys(this.editData)
      console.log(columns);
      this.demoservice.onEditrows({'table':this.dropfields?.value,'columns':columns,'texts':value,'id':args.rowData['id']}).subscribe(
          (data:any)=>{
            console.log(data);
            if(data==1){
              alert('Edited successfully');
              this.postDropdown.value
            this.onSelectedDrop();
              this.GRID.refresh()
            }
            else
              alert('Data not Added');
              this.postDropdown.value
            this.onSelectedDrop();
              this.GRID.refresh()
          }
      )
  }

  else if (args.requestType == 'delete'){
    console.log(args)
    console.log('this is delete')
    console.log(args.promise[0]['id']);
    this.idValue=args.promise[0]['id'];
    let value:any= Object.values(this.dummuyD2)
    let columns:any=Object.keys(this.dummuyD2)
    this.demoservice.onDeleterows({'table':this.dropfields?.value,'id':this.idValue}).subscribe(
        (data:any)=>{
          console.log(data);
          if(data==1){
            alert('Deleted successfully');
            this.postDropdown.value
            this.onSelectedDrop();
            this.GRID.refresh()
          }
          else
            alert('Data not Added');
            this.postDropdown.value
            this.onSelectedDrop();
            this.GRID.refresh()
        }
    )

}
}
}
