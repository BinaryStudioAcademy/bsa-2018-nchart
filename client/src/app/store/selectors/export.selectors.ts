import { AppState } from '@app/models';

export const isProjectExporting = () => (state: AppState) => 
	state.exportProject.isExporting;