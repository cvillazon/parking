import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyType]'
})
export class OnlyTypeDirective {

  @Input() 
  private only: any;
  
  constructor() {}

  @HostListener('keyup',['$event.target'])
  enterNumber(event: any){
    let val = event.value.replace(/\d/g,'');
    if(this.only==='number') val = event.value.replace(/\D/g,'');
    event.value=val.substring(0,3);
  }

}
