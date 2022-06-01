import { AbstractControl, FormControl, Validators } from "@angular/forms";

export type FormType = {[key: string]: AbstractControl};

export const F_LIST: FormType = {
    name: new FormControl(null, [Validators.required, Validators.minLength(1)])
};