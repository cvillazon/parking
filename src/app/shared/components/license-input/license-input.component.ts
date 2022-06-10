import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-license-input',
  templateUrl: './license-input.component.html',
  styleUrls: ['./license-input.component.scss']
})
export class LicenseInputComponent implements OnInit {

  public letters:string;
  public numbers:number;
  @Output() licenseEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    this.letters
  }

  onChange(){
    if(this.letters?.length==3 && String(this.numbers)?.length==3){
      this.licenseEvent.emit(this.letters+""+this.numbers);
    }
  }
}
