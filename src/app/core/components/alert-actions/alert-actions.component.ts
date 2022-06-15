import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-actions',
  templateUrl: './alert-actions.component.html',
  styleUrls: ['./alert-actions.component.scss']
})
export class AlertActionsComponent implements OnInit {

  public titleStart=false;
  public msg=false;
  public btnOpt1=false;
  public btnOpt2=false;
  public titleSub=false;
  public alignLeft=false;

  constructor(
    public dialogRef: MatDialogRef<AlertActionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  action(action: any): void {
    this.dialogRef.close(action);
  }

  ngOnInit(): void {
    if(this.data.title){
      this.titleStart=true;
    }
    if(this.data.subtitle){
      this.titleSub=true;

    }
    if(this.data.message){
      this.msg=true;

    }
    if(this.data.text_button1){
      this.btnOpt1=true;

    }
    if(this.data.text_button2){
      this.btnOpt2=true;
    }
    if(this.data.align_left){
      this.alignLeft=true;
    }
  }

}