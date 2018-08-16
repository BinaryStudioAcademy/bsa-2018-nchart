import { Chart } from './chart.model';

export interface ChartsState {
	all: string[];
	byId: { [id: string]: Chart };
	active: string;
	isLoading: boolean;
}
