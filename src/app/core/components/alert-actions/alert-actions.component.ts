import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-actions',
  templateUrl: './alert-actions.component.html',
  styleUrls: ['./alert-actions.component.scss']
})
export class AlertActionsComponent implements OnInit {

  public title_start=false;
  public msg=false;
  public btn_opt1=false;
  public btn_opt2=false;
  public title_sub=false;
  public align_left=false;

  constructor(
    public dialogRef: MatDialogRef<AlertActionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  action(action: any): void {
    this.dialogRef.close(action);
  }

  ngOnInit(): void {
    if(this.data.title){
      this.title_start=true;
    }
    if(this.data.subtitle){
      this.title_sub=true;

    }
    if(this.data.message){
      this.msg=true;

    }
    if(this.data.text_button1){
      this.btn_opt1=true;

    }
    if(this.data.text_button2){
      this.btn_opt2=true;
    }
    if(this.data.align_left){
      this.align_left=true;
    }
  }

}