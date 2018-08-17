import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestChartComponent } from './test-chart.component';

describe('TestChartComponent', () => {
	let component: TestChartComponent;
	let fixture: ComponentFixture<TestChartComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestChartComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestChartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
