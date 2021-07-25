import {AbstractControl, ValidatorFn} from '@angular/forms';

export function categoryValidator(): ValidatorFn {
  return (
    control: AbstractControl
  ): { [key: string]: boolean } | null => {
    const categoryRegExp: RegExp = /^([a-z])+:([A-Z0-9 _]*[A-Z0-9][A-Z0-9 _]+);$/gi;
    const valid = !control.value || categoryRegExp.test(control.value);

    return valid ? null : { category: true };
  };
}
