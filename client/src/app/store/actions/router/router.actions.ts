import { AppAction } from '@app/models';
import { NavigationExtras } from '@angular/router';
import { Action } from '@ngrx/store';
import { RouterActionConstants } from '@app/store/actions/router/router.action-types';

export class Go
	extends AppAction<{
		path: any[];
		query?: object;
		extras?: NavigationExtras;
	}>
	implements Action {
	readonly type = RouterActionConstants.GO;
}

export class Back extends AppAction implements Action {
	readonly type = RouterActionConstants.BACK;
}

export class Forward extends AppAction implements Action {
	readonly type = RouterActionConstants.FORWARD;
}

export class Reload extends AppAction implements Action {
	readonly type = RouterActionConstants.RELOAD;
}

export class Redirect
	extends AppAction<{
		path: string;
		config: any[];
	}>
	implements Action {
	readonly type = RouterActionConstants.REDIRECT;
}

export type Actions = Go | Back | Forward | Reload | Redirect;
