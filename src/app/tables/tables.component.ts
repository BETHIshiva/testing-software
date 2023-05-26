import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServiceService } from 'src/service/service.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { GridComponent, PageSettingsModel, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  datasource: any;
@ViewChild('addTable') public addTable !:TemplateRef<any>;
@ViewChild('addTable1') public  addTable1!:TemplateRef<any>;
@ViewChild('addTable2') public addTable2!:TemplateRef<any>;
@ViewChild('addTable3') public addTable3!:TemplateRef<any>;
@ViewChild('addTable4') public addTable4!:TemplateRef<any>;
@ViewChild('addTable5') public addTable5!:TemplateRef<any>;
@ViewChild('grid')
    public grid!: GridComponent;
@ViewChild('grid1')
  public grid1!:GridComponent;

@ViewChild('textbox')
  public textbox!:TextBoxComponent;
  @ViewChild('textbox1')
  public textbox1!:TextBoxComponent;
  @ViewChild('textbox2')
  public textbox2!:TextBoxComponent;
  @ViewChild('textbox3')
  public textbox3!:TextBoxComponent;
  @ViewChild('dropdown')
  public dropdown!:DropDownListComponent;
  @ViewChild('dropdown1')
  public dropdown1!:DropDownListComponent;
  public data1 !:any;
  public data2!:any;
  public pageSettings!: PageSettingsModel
  selectionOptions !: { type: string; mode: string; };
  selectedrecords: any;
  datasource1: any;
  public SQLDATATYPES:any = ['int','float','VARCHAR(500)'];
  public column_data:any ={'id':null}
public tableDialog !:MatDialogRef<any>
public tableDialog1 !:MatDialogRef<any>

  // toolbar!: any;
  // editSettings!: { allowEditing: boolean; allowAdding: boolean; allowDeleting: boolean; mode: string; };
  // selectOptions !: { persistSelection: true, type: 'Single' };
  // filterSettings!: { type: string; };
  // tagRules !: { required: boolean; };
  // filter!: { type: string; };

  constructor(public dialog: MatDialog,private fb:FormBuilder,private http: HttpClient,private demo:ServiceService){}


  ngOnInit(): void {
    console.log('demo')
    this.tableSource1();
    this.pageSettings = { pageSize: 5 };
    this.selectionOptions = { type: 'Multiple', mode: 'Both' };

  }
  tableSource1(){
    this.demo.onGetTable().subscribe(
      (data:any)=>{
        this.datasource=data;
        console.log(data)
      }
    )


  }


  openDialog1(){
    this.tableDialog1 = this.dialog.open(this.addTable1,{
      width:'400px',
      });
      this.tableDialog1.afterClosed().subscribe((result: any) => {
        console.log(`Dialog result: ${result}`);
      });




  }
  openDialog() {
    this.tableDialog = this.dialog.open(this.addTable,{
    width:'400px',
    });


    this.tableDialog.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
      this.isTable=false;
    });

  }
  isTable=false
  onCreateTable(){
      //  console.log(this.datasource)
       console.log(this.textbox.value)
       let data =this.datasource.filter((item:any) => item.Table === this.textbox.value)
       console.log(data[0]?.Table)
       if(data[0]?.Table?.length > 0){
        console.log('exist')
        this.isTable=true;
       }else{
        console.log('added');
        this.demo.onCreateTable({'id':this.textbox.value}).subscribe(
      (data:any)=>
      {
        this.isTable=false;
        console.log(data);
        this.tableDialog.close();
        this.tableSource1();
        this.grid.refresh()
      }
      )

       }
    // if(this.datasource.filter((item:any) => item['Table'] === 'action_button')){
    //   console.log('exist')
    // }
    // else{
    //   console.log('added');

    // }




  }

  rowSelected(args: RowSelectEventArgs) {
    // let selectedrowindex: number[] = this.grid.getSelectedRowIndexes();  // Get the selected row indexes.
    // alert(selectedrowindex); // To alert the selected row indexes.
    let  selectedrecords: any = this.grid.getSelectedRecords();
    console.log(selectedrecords[0].Table) // Get the selected records.
     this.data1=selectedrecords[0].Table
     console.log('this.data1 ', this.data1);
     this.column_data.id=this.data1

this.tableSource2()

    // alert(selectedrecords);
    // this.toolbar = ['Update', 'Cancel', 'ExcelExport', 'ColumnChooser', 'Search'];
    //  this.selectOptions = { persistSelection: true, type: 'Single' };
    // this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch' };
    // this.pageSettings = { pageSize: 100 };
    // this.filterSettings = { type: 'Excel' };
    // this.filter = { type: 'CheckBox' };
    // this.tagRules = { required: true };

}
tableSource2(){
  this.demo.onCreateColoumns({'id':this.column_data.id}).subscribe(
    (data:any)=>
    {
      this.datasource1=data;
      console.log(data);

    }
    )


}
rowSelected1(args: RowSelectEventArgs){

  let  selectedrecords: any = this.grid1.getSelectedRecords();
  console.log(selectedrecords[0].COLUMN_NAME);
  this.data2=selectedrecords[0].COLUMN_NAME;



}
openDialog2(){
  console.log(this.data1);


  setTimeout(()=>{
    this.textbox2.value=this.data1;
  }, 10)
  const dialogRef2 = this.dialog.open(this.addTable2,{
    width:'400px',
    });


    dialogRef2.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });




}
onEditTable(){
  this.demo.onEditTable(JSON.stringify({'id':this.textbox2?.value,'value':this.data1})).subscribe(
    (data:any)=>
    {

      console.log(this.data1);
      console.log(data)
      this.tableSource1();
        this.grid.refresh()

    }
    )



}
isTable1=false;
onCreateColoumn(){
  // console.log(this.textbox1?.value);
  // console.log(this.data1);
  // this.demo.onColoumns({'col':this.textbox1?.value,'tableName':this.data1,'dataType':this.dropdown?.value}).subscribe(
  //   (data:any)=>
  //   {
  //     console.log(data)
  //     this.column_data.id
  //     this.tableSource2()
  //     this.grid1.refresh()
  //   }
  //   )
  console.log(this.textbox1.value)
  let data =this.datasource1.filter((item:any) => item.COLUMN_NAME === this.textbox1.value)
  console.log(data[0]?.COLUMN_NAME)
  if(data[0]?.COLUMN_NAME?.length > 0){
   console.log('exist')
   this.isTable1=true
  }else{
   console.log('added');
   this.demo.onColoumns({'col':this.textbox1?.value,'tableName':this.data1,'dataType':this.dropdown?.value}).subscribe(
 (data:any)=>
 {
   this.isTable1=false;
   console.log(data)
   this.tableDialog1.close();
  this.column_data.id
  this.tableSource2()
  this.grid1.refresh()
 }
 )

  }


}

openDialog3(){
  const dialogRef3 = this.dialog.open(this.addTable3,{
    width:'400px',
    });


    dialogRef3.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });

}
onDelete(){
  this.demo.onDeleteTable({'value':this.data1}).subscribe(
    (data:any)=>
    {

      console.log(data)
      this.tableSource1();
        this.grid.refresh()


    }
    )

}
openDialog4(event: any){
  console.log('aaaaaaa ', event);

  setTimeout(()=>{
    this.textbox3.value=this.data2;

  }, 10)

  const dialogRef4 = this.dialog.open(this.addTable4,{
    width:'400px',
    });


    dialogRef4.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });

}
onColoumnEdit(){
  this.demo.onEditColomn({'col':this.textbox3?.value,'dataType':this.dropdown1?.value,'tableName':this.data1,'prevCol':this.data2}).subscribe(

    // (res)=>{}, (err)=>{}

    // 'col':this.textbox1?.value,'tableName':this.data1,'dataType':this.dropdown?.value

    (data:any)=>
    {
      console.log(data)
      this.column_data.id
      this.tableSource2()
      this.grid1.refresh()




    }
    )

}


openDialog5(){
  const dialogRef5 = this.dialog.open(this.addTable5,{
    width:'400px',
    });


    dialogRef5.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });

}
onDeleteColumn(){
  this.demo.onDeleteCol({'tableName':this.data1,'col':this.data2}).subscribe(
    (data:any)=>
    {

      console.log(data)
      this.column_data.id
      this.tableSource2()
      this.grid1.refresh()



    }
    )

}


// selectionChanged(e: RowSelectEventArgs) {
//   console.log(this.grid.getSelectedRecords());
//   console.log(this.grid.getSelectedRowCellIndexes());
// }

}
