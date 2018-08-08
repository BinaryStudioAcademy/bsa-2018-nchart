import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RootComponent } from '@app/root.component';
import { FeatureModule } from './features/feature.module';
import { ServiceModule } from './services/service.module';
import { TestChartComponent } from './test-chart/test-chart.component';

@NgModule({
	declarations: [RootComponent, TestChartComponent],
	imports: [BrowserModule, FeatureModule, ServiceModule],
	providers: [],
	bootstrap: [RootComponent]
})
export class AppModule {}
