import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeChartComponent } from '@app/features/draftproject/custom-chart/customize-chart/customize-chart.component';

describe('CustomizeChartComponent', () => {
	let component: CustomizeChartComponent;
	let fixture: ComponentFixture<CustomizeChartComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CustomizeChartComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CustomizeChartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
