import { AppAction, FailedAction, FileData } from '@app/models';
import { LoadedDataActionConstants } from './loaded-data.action-types';

export class LoadData extends AppAction<any> {
	readonly type = LoadedDataActionConstants.LOADEDDATA_LOAD_DATA;
}

export class LoadDataComplete extends AppAction<FileData> {
	readonly type = LoadedDataActionConstants.LOADEDDATA_LOAD_DATA__COMPLETE;
}

export class LoadDataFailed extends FailedAction {
	readonly type = LoadedDataActionConstants.LOADEDDATA_LOAD_DATA__FAILED;
}

export type Actions = LoadData | LoadDataComplete | LoadDataFailed;
