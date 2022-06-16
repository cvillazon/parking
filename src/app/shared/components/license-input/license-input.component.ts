import { Component, EventEmitter, Output } from '@angular/core';
const MAX_LEN = 3;
@Component({
  selector: 'app-license-input',
  templateUrl: './license-input.component.html',
  styleUrls: ['./license-input.component.scss']
})
export class LicenseInputComponent{

  @Output() licenseEvent = new EventEmitter<string>();
  public letters: string;
  public numbers: number;
  constructor() { }

  onChange(){
    if(this.letters.length===MAX_LEN && String(this.numbers).length===MAX_LEN){
      this.licenseEvent.emit(`${this.letters}${this.numbers}`);
    }
  }
}
