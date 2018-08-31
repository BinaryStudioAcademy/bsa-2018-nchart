import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPreviewComponent } from '@app/features/draftproject/list-charts/chart-preview/chart-preview.component';

describe('ChartPreviewComponent', () => {
	let component: ChartPreviewComponent;
	let fixture: ComponentFixture<ChartPreviewComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ChartPreviewComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChartPreviewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
