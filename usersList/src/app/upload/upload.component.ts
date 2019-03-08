import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";



export const FILE_LOADED='FILE_LOADED';
export const FILE_ERROR='FILE_ERROR';
export const IS_FILE='IS_FILE';
export const FILE_UPLOADED='FILE_UPLOADED';
export const SAMPLE_FILE_URL='assets/sampleCSVfile/studentData.SAMPLE_FILE_URLcsv';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @ViewChild('fileImportInput') fileImportInput: any;
  @ViewChild('selectedFileName') selectedFileName: any;
  public importForm: any;
  public fileStatus=IS_FILE;
  public fileName: any;
  public fileUploaded;
  public downloadSampleFile=SAMPLE_FILE_URL;
  public uploadedFile:File;
  public formData: FormData = new FormData;
  public rowWiseError=new Map;
  public errorData;
  public csvData;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.importForm = this.fb.group({
      fileName:new FormControl()
    });
  }

  /**
   * Method for Drop event of file
   * @param event
   */
  onDrop(event) {
    event.preventDefault();
    this.fileName = undefined;
    let files = event.dataTransfer.files;
    if(files.length == 1){
      this.isFileStatusFailed(files);
    }
  }

  /**
   * Method to stop Drag event
   * @param event
   */
  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }


  /**
   * Method for Select a file by button Browse Files
   * @param $event
   */
  public changeListener= ($event) => {
    if($event.target.files.length>0){
      this.selectedFileName.nativeElement.value = $event.target.files[0].name;
      let targetElement: any = $event.target || $event.srcElement;
      let files = targetElement.files;
      this.isFileStatusFailed(files);
    }
  }

  /**
   * Method for successful upload of .CSV file
   * @param file
   */
  private readFile = (file) => {
    this.rowWiseError=undefined;
    this.errorData=undefined;
    this.csvData=undefined;
    this.fileName = file.name;
    this.uploadedFile=file;
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (data) => {
      this.fileStatus=FILE_UPLOADED;
    }
  }

  /**
   * Save the CSV file
   */
  save(){
    this.formData.set("file",this.uploadedFile);
   /* this.studentService.uploadStudentsCSV(this.formData).subscribe((response)=>{
      this.csvData=response;
    },error2 => {
      this.errorData=undefined;
      this.rowWiseError=undefined
      this.fileStatus=FILE_ERROR;
      if(this.commonUtils.getSizeOfObject(error2.error)){
        this.rowWiseError=error2.error;
      } else {
        this.errorData=error2.error.error;
      }



    })*/

  }

  /**
   *  Return the keys of errors in the Map
   * @param map
   * @returns {any[]}
   */
  getKeys(map){
    return Object.keys(map)
  }
  /**
   * Method for Reset of file upload
   */
  public fileReset = () => {
    this.importForm.reset();
    this.fileStatus=IS_FILE;
    this.fileName = undefined;
    this.rowWiseError=undefined;
    this.errorData=undefined;
    this.csvData=undefined;

  };

  /**
   * Method to check uploaded file is .CSV or not
   * @param file
   * @returns {any}
   */
  isCSVFile(file) {
    return file && (file.name.toLowerCase().endsWith(".csv"));
  }

  /**
   * Checks the loaded file is a .CSV or not
   * @param file
   */
  public isFileStatusFailed(file){
    if(!this.isCSVFile(file[0])){
      this.fileName = file[0].name;
      this.fileStatus=FILE_ERROR;
      this.rowWiseError=undefined;
      this.errorData=undefined;
      this.csvData=undefined;
      return;
    }
    this.readFile(file[0]);
  }

  /**
   *  Checks the uploaded file is a .CSV or not
   * @returns {boolean}
   */
  public isFileUploadedError(){
    return this.fileStatus===FILE_ERROR;
  }

  /**
   * Checks the file is loaded or not
   * @returns {boolean}
   */
  public isFile(){
    return this.fileStatus===IS_FILE;
  }

  /**
   * Checks the file is uploaded or not
   * @returns {boolean}
   */
  public isFileUploadedSuccess(){
    return this.fileStatus===FILE_UPLOADED
  }

}
