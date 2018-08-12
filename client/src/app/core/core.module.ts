import { NgModule } from '@angular/core';
import { AppComponent } from '@app/core/app/app.component';
import { CompaniesComponent } from '@app/core/companies/companies.component';
import { CompanyComponent } from '@app/core/company/company.component';
import { LoginComponent } from '@app/core/login/login.component';
import { ProjectComponent } from '@app/core/project/project.component';
import { ProjectsComponent } from '@app/core/projects/projects.component';
import { RouterModule } from '@app/router/router.module';
import { APIModule } from '@app/api/api.module';
import { SharedModule } from '@app/shared/shared.module';
import { StepperComponent } from '@app/core/project/stepper/stepper.component';
import { LoadDataComponent } from './project/load-data/load-data.component';
import { DataTableComponent } from './project/data-table/data-table.component';
import { ListChartsComponent } from './project/list-charts/list-charts.component';
import { CustomSettingsComponent } from './project/custom-settings/custom-settings.component';
import { CustomChartComponent } from './project/custom-chart/custom-chart.component';
import { CustomizeChartComponent } from './project/custom-chart/customize-chart/customize-chart.component';
import { ChartComponent } from './project/custom-chart/chart/chart.component';
import { ExportComponent } from './project/export/export.component';
import { ChartPreviewComponent } from './project/list-charts/chart-preview/chart-preview.component';
import { HeaderComponent } from './project/header/header.component';

@NgModule({
	declarations: [
		AppComponent,
		CompaniesComponent,
		CompanyComponent,
		LoginComponent,
		ProjectComponent,
		ProjectsComponent,
		StepperComponent,
		LoadDataComponent,
		DataTableComponent,
		ListChartsComponent,
		CustomSettingsComponent,
		CustomChartComponent,
		CustomizeChartComponent,
		ChartComponent,
		ExportComponent,
		ChartPreviewComponent,
		HeaderComponent
	],
	imports: [RouterModule, APIModule, SharedModule],
	exports: []
})
export class CoreModule {}
