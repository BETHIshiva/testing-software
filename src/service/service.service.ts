import { Injectable } from '@angular/core';
import{HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public header= new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  public options={ headers: this.header};
  [x: string]: any;
  data:any;

  constructor(private http: HttpClient) { }
  SelectProduct(){
    return this.http.get('http://localhost/testing/product%20.php');
  }
  starttest(val:any){
    return this.http.post('http://localhost/testing/startTest.php',val);
  }
  adddetails(){
    return this.http.get('http://localhost/testing/selectedynamic.php');

  }
  onInsert(val:any){
    return this.http.post('http://localhost/testing/insert.php',val);
  }
  onGetTexbox(val:any){
    return this.http.post('http://localhost/testing/datapoll.php',val);
  }
  onInsertBox(val:any){
    return this.http.post('http://localhost/testing/add1.php',val);
  }
  onGetTextbox2(val:any){
    return this.http.post('http://localhost/testing/datapoll1.php',val);
  }
  onInsertBox2(val:any){
    return this.http.post('http://localhost/testing/add2.php',val);
  }
  onSelectGrid(){
    return this.http.get("http://localhost/testing/selectgrid.php");
  }
  onGetTable(){
    return this.http.get("http://localhost/testing/tableoperations.php?tag=gettable");
  }
  onCreateTable(val:any){
    return this.http.post("http://localhost/testing/tableoperations.php?tag=createtable",val);
  }
  onCreateColoumns(val:any){
    return this.http.post("http://localhost/testing/tableoperations.php?tag=getcolumn",val);
  }
  onColoumns(val:any){
    return this.http.post("http://localhost/testing/tableoperations.php?tag=createcolumn",val);
  }
  onEditTable(val:any){
    return this.http.post("http://localhost/testing/tableoperations.php?tag=edittable",val);

  }
  onDeleteTable(val:any){
    return this.http.post("http://localhost/testing/tableoperations.php?tag=deletetable",val);

  }
  onEditColomn(val:any){
    return this.http.post("http://localhost/testing/tableoperations.php?tag=editcolumn",val);
  }
  onDeleteCol(val:any){
    return this.http.post("http://localhost/testing/tableoperations.php?tag=deletecolumn",val)
  }
  ongetTablefields(){
    return this.http.get("http://localhost/testing/tableoperations.php?tag=getTablefields");
  }
  onSelecttable(val:any){
    return this.http.post("http://localhost/testing/tableoperations.php?tag=selectTables",val);
  }
  onEditrows(val:any){
    return this.http.post("http://localhost/testing/tableoperations.php?tag=editrow",val);
  }
  onInsertrows(val:any){
    return this.http.post("http://localhost/testing/tableoperations.php?tag=addrows",val);
  }
  onDeleterows(val:any){
    return this.http.post("http://localhost/testing/tableoperations.php?tag=deleterow",val);
  }
  ondynamicTablefields(){
    return this.http.get("http://localhost/testing/dynamicTableOperations.php?tag=selectDrop");
  }
  ondynamicTableDropValue(val:any){
    console.log('yes')
    return this.http.post("http://localhost/testing/dynamicTableOperations.php?tag=DropValue",val)
  }
  forMasterTable(){
    console.log('master')
    return this.http.get("http://localhost/testing/dynamicTableOperations.php?tag=mastertable");
  }
  forMandatory(){
    return this.http.get("http://localhost/testing/dynamicTableOperations.php?tag=validate_table")
  }
  forDisable(){
    return this.http.get("http://localhost/testing/dynamicTableOperations.php?tag=validate_table")
  }
  forInsertValues(val:any){
    return this.http.post("http://localhost/testing/dynamicTableOperations.php?tag=InsertDynamicComp",val)
  }
  forHasMaster(){
    return this.http.get("http://localhost/testing/dynamicTableOperations.php?tag=validate_table")

  }
  forFieldsTable(val:any){
    return this.http.post("http://localhost/testing/dynamicTableOperations.php?tag=selectfields",val);
  }
  ForDeleteGrid(val:any){
    return  this.http.post("http://localhost/testing/dynamicTableOperations.php?tag=DeleteGridRow",val)
  }
  forProductTypeAction(){
    return this.http.get("http://localhost/testing/dynamicTableActions.php?tag=selectProductType");
  }
  forSelectGrid(val:any){
    return this.http.post("http://localhost/testing/dynamicTableActions.php?tag=selectGrid",val)
  }
  forInsertAction(val:any){
    console.log(val);
    return this.http.post("http://localhost/testing/dynamicTableActions.php?tag=InsertAction",val)
  }
  forDropdownButtonName(){
    return this.http.get("http://localhost/testing/dynamicTableActions.php?tag=button_names_drop");
  }
  forDropdownTextboxName(val:any){
    return this.http.post("http://localhost/testing/dynamicTableActions.php?tag=Textbox_names",val);
  }
  forDeleteAction(val:any){
    return this.http.post("http://localhost/testing/dynamicTableActions.php?tag=DeleteAction",val);
  }
  forselectGridpage(val:any){
    return this.http.post("http://localhost/testing/TableGridOperation.php?tag=selectGrid",val);
  }

}
