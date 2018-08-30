import { NgModule } from '@angular/core';
import { UIKitModule } from '@app/shared/uikit.module';
import { TestChartComponent } from '@app/shared/components/charts/test-chart/test-chart.component';
import { BarChartComponent } from '@app/shared/components/charts/bar-chart/bar-chart.component';
import { PieChartComponent } from '@app/shared/components/charts/pie-chart/pie-chart.component';
import { BarChartCustomizeComponent } from '@app/shared/components/charts/bar-chart/bar-chart-customize.component';
import { FormFieldModule } from '@app/shared/components/form-field/form-field.module';

const chartComponents = [
	TestChartComponent,
	BarChartComponent,
	PieChartComponent,
	BarChartCustomizeComponent
];

@NgModule({
	imports: [UIKitModule, FormFieldModule],
	declarations: chartComponents,
	exports: chartComponents
})
export class ChartsModule {}
