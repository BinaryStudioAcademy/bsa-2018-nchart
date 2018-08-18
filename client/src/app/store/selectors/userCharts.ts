import { AppState } from '@app/models';
import { SchemeID } from '@app/models/normalizr.model';

export const userChart = (id?: SchemeID) => (state: AppState) =>
	state.userCharts.byId[id];
