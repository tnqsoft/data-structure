import { ValidatorFn, AbstractControl } from '@angular/forms';
import { DomValidator } from '../data-structure/string-processor/html/dom.validator';

export function htmlValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;
    }

    const domValidator: DomValidator = new DomValidator(control.value);
    domValidator.parser();
    if (domValidator.getError().length > 0) {
      console.log(domValidator.getError());
      return { 'htmlcheck': { value: control.value } };
    }

    return null;
  };
}
