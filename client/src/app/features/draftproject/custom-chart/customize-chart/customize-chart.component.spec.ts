import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeChartComponent } from './customize-chart.component';

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
