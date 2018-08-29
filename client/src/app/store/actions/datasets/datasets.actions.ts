import { DatasetActions } from '@app/store/actions/datasets/datasets.action-types';
import { AppAction, FailedAction } from '@app/models/store.model';
import { SchemeID } from '@app/models/normalizr.model';

export class ParseByText extends AppAction<{ text: string }> {
	readonly type = DatasetActions.PARSE_PLAIN_TEXT;
}

export class ParseByFile extends AppAction<{ file: File }> {
	readonly type = DatasetActions.PARSE_FROM_FILE;
}

export class ParseByLink extends AppAction<{ link: string }> {
	readonly type = DatasetActions.PARSE_FROM_URL;
}

export class ParseComplete extends AppAction<any> {
	readonly type = DatasetActions.PARSE_DATA__COMPLETE;
}

export class ParseFailed extends FailedAction {
	readonly type = DatasetActions.PARSE_DATA__FAILED;
}

export class ChangeContent extends AppAction<{
	id: string | number;
	value: string;
}> {
	readonly type = DatasetActions.CHANGE_CONTENT;
}

export class ChangeHeaderTitle extends AppAction<{
	id: string | number;
	title: string;
}> {
	readonly type = DatasetActions.CHANGE_HEADER_TITLE;
}

export class DeleteRow extends AppAction<{ id: string | number }> {
	readonly type = DatasetActions.DELETE_ROW;
}

export class DeleteColumn extends AppAction<{ id: string | number }> {
	readonly type = DatasetActions.DELETE_COLUMN;
}

export type Actions =
	| ChangeContent
	| ChangeHeaderTitle
	| DeleteRow
	| DeleteColumn
	| ParseFailed
	| ParseComplete
	| ParseByText
	| ParseByFile
	| ParseByLink;
