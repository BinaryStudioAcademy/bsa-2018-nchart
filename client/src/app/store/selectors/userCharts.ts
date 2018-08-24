import { SchemeID } from '@app/models/normalizr.model';
import { AppState } from '@app/models/store.model';

export const userChart = (id?: SchemeID) => (state: AppState) =>
	state.userCharts.byId[id];
