import { OnlyTypeDirective } from './only-type.directive';

describe('OnlyTypeDirective', () => {
  it('should create an instance', () => {
    const directive = new OnlyTypeDirective();
    expect(directive).toBeTruthy();
  });
  
  it('should accept only 3 strings', () => {
    const directive = new OnlyTypeDirective();
    const eventInput:string= 'HJ2i1y1';
    directive.only='string';

    directive.enterNumber(eventInput);
    expect(directive.val.length).toBe(3);
  });
  
  it('should accept only 3 numbers', () => {
    const directive = new OnlyTypeDirective();
    const eventInput='H982J2';
    directive.only='number';

    directive.enterNumber(eventInput);
    expect(directive.val.length).toBe(3);
  });
});
