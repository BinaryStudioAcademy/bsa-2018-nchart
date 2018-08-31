import { NgModule } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { FormService } from '@app/services/form.service';
import { LoginService } from '@app/services/login.service';
import { SourceService } from '@app/services/source.service';
import { ProjectService } from '@app/services/project.service';
import { DatasetService } from '@app/services/dataset.service';
import { ChartService } from '@app/services/chart.service';
import { TokenService } from '@app/services/token.service';
import { BarChartService } from '@app/services/charts/bar-chart.service';
import { ExportSvgBusService } from './export-svg-bus.service';

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
		BarChartService,
		ExportSvgBusService
	]
})
export class ServiceModule {}
