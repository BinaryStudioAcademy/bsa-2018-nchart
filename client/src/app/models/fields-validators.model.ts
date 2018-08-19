import { ValidatorFn } from '@angular/forms';

export type fieldsValidators<T> = { [P in keyof T]: ValidatorFn[] };

export type OptionalType<T> = { [P in keyof T]?: T[P] };
