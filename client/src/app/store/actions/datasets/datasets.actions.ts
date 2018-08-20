import {DatasetActions} from '@app/store/actions/datasets/datasets.action-types';
import {AppAction, FailedAction} from '@app/models';

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

export type Actions =
	| ParseFailed
	| ParseComplete
	| ParseByText
	| ParseByFile
	| ParseByLink;
