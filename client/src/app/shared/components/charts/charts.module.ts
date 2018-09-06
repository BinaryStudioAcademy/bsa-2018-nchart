import { NgModule } from '@angular/core';
import { UIKitModule } from '@app/shared/uikit.module';
import { TestChartComponent } from '@app/shared/components/charts/test-chart/test-chart.component';
import { BarChartComponent } from '@app/shared/components/charts/bar-chart/bar-chart.component';
import { PieChartComponent } from '@app/shared/components/charts/pie-chart/pie-chart.component';
import { BarChartCustomizeComponent } from '@app/shared/components/charts/bar-chart/bar-chart-customize.component';
import { FormFieldModule } from '@app/shared/components/form-field/form-field.module';
import { PieChartCustomizeComponent } from '@app/shared/components/charts/pie-chart/pie-chart-customize.component';
import { ScatterplotChartComponent } from '@app/shared/components/charts/scatterplot-chart/scatterplot-chart.component';
import { ScatterplotChartCustomizeComponent } from '@app/shared/components/charts/scatterplot-chart/scatterplot-chart-customize';
import { AlluvialDiagramChartComponent } from '@app/shared/components/charts/alluvial-diagram-chart/alluvial-diagram-chart.component';

const chartComponents = [
	TestChartComponent,
	BarChartComponent,
	PieChartComponent,
	ScatterplotChartComponent,
	BarChartCustomizeComponent,
	PieChartCustomizeComponent,
	ScatterplotChartCustomizeComponent,
	AlluvialDiagramChartComponent
];

@NgModule({
	imports: [UIKitModule, FormFieldModule],
	declarations: chartComponents,
	exports: chartComponents
})
export class ChartsModule {}
