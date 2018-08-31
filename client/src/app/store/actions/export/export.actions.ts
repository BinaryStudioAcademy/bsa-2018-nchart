import { ExportActionConstants } from '@app/store/actions/export/export.action-types';
import { ProjectExportPayload } from '@app/models/export.model';
import { AppAction, FailedAction } from '@app/models/store.model';

export class ExportProject extends AppAction<ProjectExportPayload> {
	readonly type = ExportActionConstants.EXPORT_PROJECT;
}

export class ExportComplete extends AppAction {
	readonly type = ExportActionConstants.EXPORT__COMPLETE;
}

export class ExportFailed extends FailedAction {
	readonly type = ExportActionConstants.EXPORT__FAILED;
}

export type Actions = ExportProject | ExportComplete | ExportFailed;
