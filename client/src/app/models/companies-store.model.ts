import { Company } from './company.model';
import { NormalizedSchemeWithFetching } from '@app/models/normalizr.model';

export type CompaniesState<R = undefined> = NormalizedSchemeWithFetching<Company, R>;
