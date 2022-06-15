import { Directive, HostListener, Input } from '@angular/core';
const MAX_LEN = 3;
@Directive({
  selector: '[appOnlyType]'
})
export class OnlyTypeDirective {

  @Input() 
  public only: string;

  public val;
  
  constructor() {}

  @HostListener('keyup',['$event.target.value'])
  enterNumber(event: string){
    let val = event.replace(/\d/g,'');
    if(this.only==='number'){
      val = event.replace(/\D/g,'');
    } 
    this.val=val.substring(0,MAX_LEN);
    event=val.substring(0,MAX_LEN);
  }

}
