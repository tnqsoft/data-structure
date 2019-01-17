import { ValidatorFn, AbstractControl } from '@angular/forms';
import { PolishNotationAlgorithm } from '../data-structure/algorithms/polish-notation.algorithm';

export function expressionValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;
    }
    try {
      const polishNotation: PolishNotationAlgorithm = new PolishNotationAlgorithm(control.value);
      return null;
    } catch (e) {
      return { 'expression': { value: control.value } };
    }
  };
}
