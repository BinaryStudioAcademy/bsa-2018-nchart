import { NgModule } from '@angular/core';
import { UIKitModule } from '@app/shared/uikit.module';
import { TestChartComponent } from '@app/shared/components/charts/test-chart/test-chart.component';
import { BarChartComponent } from '@app/shared/components/charts/bar-chart/bar-chart.component';
import { AxisDirective } from '@app/shared/components/charts/axis.directive';
import { BarChartCustomizeComponent } from '@app/shared/components/charts/bar-chart/bar-chart-customize.component';
import { FormFieldModule } from '@app/shared/components/form-field/form-field.module';

const chartComponents = [
	TestChartComponent,
	BarChartComponent,
	AxisDirective,
	BarChartCustomizeComponent
];

@NgModule({
	imports: [UIKitModule, FormFieldModule],
	declarations: chartComponents,
	exports: chartComponents
})
export class ChartsModule {}
