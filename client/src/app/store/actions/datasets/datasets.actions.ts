import { DatasetActions } from '@app/store/actions/datasets/datasets.action-types';
import { AppAction, FailedAction } from '@app/models/store.model';

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

export class DeleteRow extends AppAction<{ id: string }> {
	readonly type = DatasetActions.DELETE_ROW;
}

export class DeleteColumn extends AppAction<{ id: string }> {
	readonly type = DatasetActions.DELETE_COLUMN;
}

export class PreloadSamples extends AppAction<any> {
	readonly type = DatasetActions.PRELOAD_SAMPLES;
}

export class PreloadSamplesComplete extends AppAction<any> {
	readonly type = DatasetActions.PRELOAD_SAMPLES__COMPLETE;
}

export class PreloadSamplesFailed extends FailedAction {
	readonly type = DatasetActions.PRELOAD_SAMPLES__FAILED;
}

export class LoadSample extends AppAction<{
	id: string;
}> {
	readonly type = DatasetActions.LOAD_SAMPLE;
}

export class LoadSampleComplete extends AppAction<any> {
	readonly type = DatasetActions.LOAD_SAMPLE__COMPLETE;
}

export class LoadSampleFailed extends FailedAction {
	readonly type = DatasetActions.LOAD_SAMPLE__FAILED;
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
	| ParseByLink
	| PreloadSamples
	| PreloadSamplesComplete
	| PreloadSamplesFailed
	| LoadSample
	| LoadSampleComplete
	| LoadSampleFailed;
