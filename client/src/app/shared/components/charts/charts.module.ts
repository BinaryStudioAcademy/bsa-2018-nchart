import { NgModule } from '@angular/core';
import { UIKitModule } from '@app/shared/uikit.module';
import { TestChartComponent } from '@app/shared/components/charts/test-chart/test-chart.component';
import { BarChartComponent } from '@app/shared/components/charts/bar-chart/bar-chart.component';
import { AxisDirective } from '@app/shared/components/charts/axis.directive';

const chartComponents = [TestChartComponent, BarChartComponent, AxisDirective];

@NgModule({
	imports: [UIKitModule],
	declarations: chartComponents,
	exports: chartComponents
})
export class ChartsModule {}
