import { AppAction, FailedAction, FileData } from '@app/models';
import { ModifiedDataActionConstants } from './modified-data.action-types';

export class LoadData extends AppAction<any> {
	readonly type = ModifiedDataActionConstants.MODIFIEDDATA_LOAD_DATA;
}

export class ChangeContent extends AppAction<{
	content: string;
	indexRow: number;
	indexCol: number;
}> {
	readonly type = ModifiedDataActionConstants.MODIFIEDDATA_CHANGE_CONTENT;
}

export class ChangeHeaderTitle extends AppAction<{
	newTitle: string;
	indexCol: number;
}> {
	readonly type =
		ModifiedDataActionConstants.MODIFIEDDATA_CHANGE_HEADER_TITLE;
}

export class DeleteRow extends AppAction<{
	index: number;
}> {
	readonly type = ModifiedDataActionConstants.MODIFIEDDATA_DELETE_ROW;
}

export class DeleteColumn extends AppAction<{
	index: number;
}> {
	readonly type = ModifiedDataActionConstants.MODIFIEDDATA_DELETE_COLUMN;
}

export class LoadDataComplete extends AppAction<FileData> {
	readonly type =
		ModifiedDataActionConstants.MODIFIEDDATA_LOAD_DATA__COMPLETE;
}

export class LoadDataFailed extends FailedAction {
	readonly type = ModifiedDataActionConstants.MODIFIEDDATA_LOAD_DATA__FAILED;
}

export type Actions =
	| LoadData
	| LoadDataComplete
	| LoadDataFailed
	| ChangeHeaderTitle
	| ChangeContent
	| DeleteRow
	| DeleteColumn;
