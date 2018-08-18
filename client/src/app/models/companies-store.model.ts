import { Company } from '@app/models/company.model';

export interface CompaniesState {
	all: string[];
	byId: { [id: string]: Company };
	isLoading: boolean;
}
