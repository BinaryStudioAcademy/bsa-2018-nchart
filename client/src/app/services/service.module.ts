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
import { PieChartService } from '@app/services/charts/pie-chart.service';
import { ExportSvgBusService } from '@app/services/export-svg-bus.service';
import { ScatterplotChartService } from '@app/services/charts/scatterplot-chart.service';
import { AlluvialDiagramChartService } from '@app/services/charts/alluvial-diagram-chart.service';

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
		PieChartService,
		ExportSvgBusService,
		ScatterplotChartService,
		AlluvialDiagramChartService
	]
})
export class ServiceModule {}
