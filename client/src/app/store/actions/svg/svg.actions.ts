import { AppAction } from '@app/models/store.model';
import { SvgActionConstants } from './svg.actions-type';
import { SvgFile } from '@app/models/svg.model';

export class SaveSvgAction extends AppAction<{svg : SvgFile}> {
	readonly type = SvgActionConstants.SAVE_SVG;
}

export type Actions =
	| SaveSvgAction
