import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomChartComponent } from '@app/features/draftproject/custom-chart/custom-chart.component';

describe('CustomChartComponent', () => {
	let component: CustomChartComponent;
	let fixture: ComponentFixture<CustomChartComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CustomChartComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CustomChartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
