import { AppAction, Company, FailedAction } from '@app/models';
import { CompaniesActionConstants } from '@app/store/actions/companies/companies.action-types';

export class LoadData extends AppAction<any> {
	readonly type = CompaniesActionConstants.LOAD_COMPANIES;
}

export class LoadDataComplete extends AppAction<{
	companies: {
		all: Array<string>;
		byId: { [id: string]: Company };
	};
}> {
	readonly type = CompaniesActionConstants.LOAD_COMPANIES__COMPLETE;
}

export class LoadDataFailed extends FailedAction {
	readonly type = CompaniesActionConstants.LOAD_COMPANIES__FAILED;
}

export type Actions = LoadData | LoadDataComplete | LoadDataFailed;
