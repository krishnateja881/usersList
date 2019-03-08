import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { UsersComponent } from './users/users.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UploadComponent } from './upload/upload.component';
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "./users/userService";
import {NgxEditorModule} from "ngx-editor";

const appRoutes : Routes=[
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent},
  {path:'upload',component: UploadComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    UsersComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgxEditorModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
