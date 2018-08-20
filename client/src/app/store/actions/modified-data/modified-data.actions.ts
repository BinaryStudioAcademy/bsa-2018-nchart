import { AppAction } from '@app/models';
import { ModifiedDataActionConstants } from '@app/store/actions/modified-data/modified-data.action-types';

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

export type Actions =
	| ChangeHeaderTitle
	| ChangeContent
	| DeleteRow
	| DeleteColumn;
