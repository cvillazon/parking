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

  @HostListener('keyup',['$event.target'])
  enterNumber(event: any){
    let val = event.value.replace(/\d/g,'');
    if(this.only==='number'){
      val = event.value.replace(/\D/g,'');
    } 
    this.val=val.substring(0,MAX_LEN);
    event.value=val.substring(0,MAX_LEN);
  }

}
