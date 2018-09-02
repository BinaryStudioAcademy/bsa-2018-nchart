import { NgModule } from '@angular/core';
import { StepperComponent } from '@app/features/draftproject/stepper/stepper.component';
import { LoadDataComponent } from '@app/features/draftproject/load-data/load-data.component';
import { DataTableComponent } from '@app/features/draftproject/data-table/data-table.component';
import { ListChartsComponent } from '@app/features/draftproject/list-charts/list-charts.component';
import { CustomChartComponent } from '@app/features/draftproject/custom-chart/custom-chart.component';
import { CustomizeChartComponent } from '@app/features/draftproject/custom-chart/customize-chart/customize-chart.component';
import { ChartComponent } from '@app/features/draftproject/custom-chart/chart/chart.component';
import { ExportComponent } from '@app/features/draftproject/export/export.component';
import { ChartPreviewComponent } from '@app/features/draftproject/list-charts/chart-preview/chart-preview.component';
import { ProjectNameComponent } from '@app/features/draftproject/project-name/project-name.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { DimensionSettingsComponent } from '@app/features/draftproject/dimension-settings/dimension-settings.component';

@NgModule({
	imports: [
		SharedModule,
		TabViewModule,
		FileUploadModule,
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		DialogModule
	],
	declarations: [
		StepperComponent,
		LoadDataComponent,
		DataTableComponent,
		ListChartsComponent,
		DimensionSettingsComponent,
		CustomChartComponent,
		CustomizeChartComponent,
		ChartComponent,
		ExportComponent,
		ChartPreviewComponent,
		ProjectNameComponent
	],
	exports: [
		StepperComponent,
		LoadDataComponent,
		DataTableComponent,
		ListChartsComponent,
		DimensionSettingsComponent,
		CustomChartComponent,
		CustomizeChartComponent,
		ChartComponent,
		ExportComponent,
		ChartPreviewComponent,
		ProjectNameComponent
	]
})
export class DraftprojectModule {}
