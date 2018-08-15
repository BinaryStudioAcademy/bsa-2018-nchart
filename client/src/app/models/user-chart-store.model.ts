import { CustomizeOption } from '@app/models/chart.model';

export interface UserChartState {
	id?: number;
	customize_settings?: CustomizeOption[];
}
