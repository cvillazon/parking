import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntryData } from '@core/model/entry-data';

@Component({
  selector: 'app-alert-actions',
  templateUrl: './alert-actions.component.html',
  styleUrls: ['./alert-actions.component.scss']
})
export class AlertActionsComponent implements OnInit{
  
  public data2;
  public beta="BETA";
  constructor(
    public dialogRef: MatDialogRef<AlertActionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntryData) {      
      this.data2=data.subtitle;
    }
    

  ngOnInit(): void {
    this.data2=this.data;
  }

  action(action: number): void {
    this.dialogRef.close(action);
  }
}
