import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntryData } from '@core/model/entry-data';

@Component({
  selector: 'app-alert-actions',
  templateUrl: './alert-actions.component.html',
  styleUrls: ['./alert-actions.component.scss']
})
export class AlertActionsComponent{
  
  constructor(
    public dialogRef: MatDialogRef<AlertActionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntryData) {}

  action(action: number): void {
    this.dialogRef.close(action);
  }
}
