import { Validators } from '@angular/forms';

export type fieldsValidators<T> = { [P in keyof T]: Validators[] };

export type OptionalType<T> = { [P in keyof T]?: T[P] };
