import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {UserService} from "./userService";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  enteredText: string;
  itemValues=[];
  filteredItems =[];
  dateValue = Date.now();
  info:String = "This is a static text";
  id=1;
  information:any;
  currentSelectedId:any;
  selectedPosition:any
  isInputTextEnter= false;
  htmlContent
  selectedEmailId: any
  imageUrlArray=["assets/student-registration-form.png","assets/StudentForm.png"]

  constructor(private fb: FormBuilder,private userService:UserService){

   /* this.localStorage.getItem('allNotes').subscribe((notes:[{}]) => {
      if(notes) {
        this.itemValues = notes;
        this.filteredItems =this.itemValues;
      }
    });*/
  }



  assignCopy() {
    this.filteredItems = Object.assign([], this.itemValues);
  }

  /**
   * Searching for a task from the list
   * @param value
   */
  filterItem(value) {
    if (!value) {
      this.assignCopy();// when nothing has typed
    }
    this.filteredItems = Object.assign([], this.itemValues).filter(
      item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }

  /**
   * Saving the task entry
   */
  save(){

    this.information = {
      id: Math.floor(Math.random() * Math.floor(1000)),
      data: this.enteredText,
      date: Date.now(),
      info: this.info
    }
    this.itemValues.push(this.information);

    this.filteredItems = this.itemValues;
   /* this.localStorage.setItem("allNotes", this.itemValues).subscribe(() => {
    });*/
    this.enteredText = '';
    this.isInputTextEnter = false;


  }


  /**
   * Remove a Task from the list
   */
  remove(){
    this.itemValues.splice(this.selectedPosition,1);
    this.filteredItems= this.itemValues;
    this.enteredText = '';
   // this.localStorage.setItem("allNotes",this.itemValues).subscribe(() => {});
  }

  /**
   * selected a task and its position
   * @param id
   * @param index
   */
  getInfoData(id,index,email){
    console.log("----",id,index)
    this.selectedEmailId = email;
    this.currentSelectedId = id;
    this.selectedPosition = index;
    this.filteredItems.forEach((value,i)=>{
      if(value._id==id){
       // this.enteredText = value.data;
      }
    })
  }

  /**
   *
   */
  enterTextValue(){
    this.enteredText = 'New Note'
    this.isInputTextEnter = true;
  }

  ngOnInit(): void {
    this.userService.loadUsers().subscribe((data)=>{
      this.itemValues=data
      this.filteredItems =this.itemValues;
    })
  }

}
