import { AppAction, FailedAction, FileData } from '@app/models';
import { ModifiedDataActionConstants } from './modified-data.action-types';

export class LoadData extends AppAction<any> {
	readonly type = ModifiedDataActionConstants.MODIFIEDDATA_LOAD_DATA;
}

export class LoadDataComplete extends AppAction<FileData> {
	readonly type =
		ModifiedDataActionConstants.MODIFIEDDATA_LOAD_DATA__COMPLETE;
}

export class LoadDataFailed extends FailedAction {
	readonly type = ModifiedDataActionConstants.MODIFIEDDATA_LOAD_DATA__FAILED;
}

export type Actions = LoadData | LoadDataComplete | LoadDataFailed;
