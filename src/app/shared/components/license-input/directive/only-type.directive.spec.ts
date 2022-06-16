import { OnlyTypeDirective } from './only-type.directive';

describe('OnlyTypeDirective', () => {
  let spyReplace;
  beforeEach(() => {
    spyReplace = spyOn(String.prototype,'replace').and.callThrough();
  });

  it('should create an instance', () => {
    const directive = new OnlyTypeDirective();
    expect(directive).toBeTruthy();
  });
  
  it('should accept only 3 strings', () => {
    const directive = new OnlyTypeDirective();
    const eventInput = {value:'HJ2i1y1'};
    directive.only='string';

    directive.enterNumber(eventInput);
    expect(directive.val.length).toBe(3);
    expect(isNaN(directive.val)).toBe(true);
    expect(spyReplace).toHaveBeenCalledWith(/\d/g,'');

  });
  
  it('should accept only 3 numbers', () => {
    const directive = new OnlyTypeDirective();
    const eventInput = {value:'H982J2'};
    directive.only='number';

    directive.enterNumber(eventInput);
    expect(directive.val.length).toBe(3);
    expect(isNaN(directive.val)).toBe(false);
    expect(spyReplace).toHaveBeenCalledWith(/\D/g,'');
  });
});
