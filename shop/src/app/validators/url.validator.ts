import { AbstractControl, ValidatorFn } from "@angular/forms";

export function urlValidator(): ValidatorFn {
  const urlPattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;

  return (formControl: AbstractControl) => {
    const url = formControl.value as string;
    
    if (url.search(urlPattern) !== -1) {
      return null;
    }

    return {errorUrl: true};
  }
}
