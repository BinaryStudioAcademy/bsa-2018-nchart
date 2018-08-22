import { NgModule } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { FormService } from '@app/services/form.service';
import { LoginService } from '@app/services/login.service';
import { SourceService } from '@app/services/source.service';
import { ProjectService } from './project.service';
import { DatasetService } from './dataset.service';
import { ChartService } from './chart.service';
import { TokenService } from '@app/services/token.service';
import { BarChartService } from '@app/services/charts/bar-chart.service';

@NgModule({
	providers: [
		StoreService,
		FormService,
		LoginService,
		SourceService,
		ProjectService,
		DatasetService,
		TokenService,
		ChartService,
		BarChartService
	]
})
export class ServiceModule {}
