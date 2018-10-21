import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";
import { NavbarComponent } from "./navbar/navbar.component";
import { LatestNewsComponent } from "./latest-news/latest-news.component";
import { FooterComponent } from "./footer/footer.component";
import { LodingpageComponent } from "./lodingpage/lodingpage.component";
import { NgxEditorModule } from "ngx-editor";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import "rxjs/add/observable/of";
import { FormsModule } from "@angular/forms";
import { CKEditorModule } from 'ngx-ckeditor';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    NgxEditorModule,
    TooltipModule,
    FormsModule,
    CKEditorModule,
    NgxPaginationModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    NavbarComponent,
    FormsModule,
    NavbarComponent,
    LatestNewsComponent,
    FooterComponent,
    LodingpageComponent,
    NgxEditorModule,
    TooltipModule,
    FormsModule,
    CKEditorModule,
    NgxPaginationModule
  ],
  declarations: [
    NavbarComponent,
    LatestNewsComponent,
    FooterComponent,
    LodingpageComponent
  ]
})
export class ShareModule {}
