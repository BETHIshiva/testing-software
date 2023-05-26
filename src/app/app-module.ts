import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import {TextBoxModule} from '@syncfusion/ej2-angular-inputs';
import { HttpClientModule } from '@angular/common/http';
import { GridModule,PageService } from '@syncfusion/ej2-angular-grids';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import {MatToolbarModule} from '@angular/material/toolbar';
import { TablesComponent } from './tables/tables.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { DynamicfieldsComponent } from './dynamicfields/dynamicfields.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditService, ToolbarService, FilterService,SortService} from '@syncfusion/ej2-angular-grids';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { TablefieldsComponent } from './tablefields/tablefields.component';
import { HttpErrorInterceptor } from './Http_Interceptors/HttpErrorInterceptor ';
import { HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { ActionComponent } from './action/action.component';
import { GridviewComponent } from './gridview/gridview.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
@NgModule({
  declarations: [
    AppComponent,
    TablesComponent,
    DynamicComponent,
    TablefieldsComponent,
    DynamicfieldsComponent,
    ActionComponent,GridviewComponent
  ],
  imports: [
    TreeGridModule,ScheduleModule,
    DatePickerModule,DateRangePickerModule,
    BrowserModule, HttpClientModule,GridModule,MatToolbarModule,AppRoutingModule,MatDialogModule,BrowserAnimationsModule,
    MatCardModule,DropDownListModule,ReactiveFormsModule,FormsModule,TextBoxModule,MatIconModule,MatButtonModule, 
  ],
  providers: [EditService, ToolbarService, PageService, FilterService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
