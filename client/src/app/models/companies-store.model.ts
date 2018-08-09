import { Company } from './company.model';

export interface CompaniesState {
	all: Array<string>;
	byId: { [id: string]: Company };
	isLoading: boolean;
}
