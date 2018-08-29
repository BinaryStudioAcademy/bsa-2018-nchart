import { DatasetActionConstants as constants } from '@app/store/actions/datasets/datasets.action-types';
import { AppAction, FailedAction } from '@app/models/store.model';
import { SchemeID } from '@app/models/normalizr.model';

export class ParseByText extends AppAction<{ text: string }> {
	readonly type = constants.PARSE_PLAIN_TEXT;
}

export class ParseByFile extends AppAction<{ file: File }> {
	readonly type = constants.PARSE_FROM_FILE;
}

export class ParseByLink extends AppAction<{ link: string }> {
	readonly type = constants.PARSE_FROM_URL;
}

export class ParseComplete extends AppAction<any> {
	readonly type = constants.PARSE_DATA__COMPLETE;
}

export class ParseFailed extends FailedAction {
	readonly type = constants.PARSE_DATA__FAILED;
}

export class ChangeContent extends AppAction<{
	id: SchemeID;
	value: string;
}> {
	readonly type = constants.CHANGE_CONTENT;
}

export class ChangeHeaderTitle extends AppAction<{
	id: SchemeID;
	title: string;
}> {
	readonly type = constants.CHANGE_HEADER_TITLE;
}

export class DeleteRow extends AppAction<{ id: SchemeID }> {
	readonly type = constants.DELETE_ROW;
}

export class DeleteColumn extends AppAction<{
	id: SchemeID;
	index: number;
	datasetId: SchemeID;
}> {
	readonly type = constants.DELETE_COLUMN;
}

export class ChangeColumnType extends AppAction<{
	id: SchemeID;
	type: string;
}> {
	readonly type = constants.CHANGE_COLUMN_TYPE;
}

export type Actions =
	| ChangeColumnType
	| ChangeContent
	| ChangeHeaderTitle
	| DeleteRow
	| DeleteColumn
	| ParseFailed
	| ParseComplete
	| ParseByText
	| ParseByFile
	| ParseByLink;
