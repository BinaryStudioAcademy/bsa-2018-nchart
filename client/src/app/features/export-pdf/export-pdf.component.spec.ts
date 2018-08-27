import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportPdfComponent } from '@app/features/export-pdf/export-pdf.component';

describe('ExportComponent', () => {
	let component: ExportPdfComponent;
	let fixture: ComponentFixture<ExportPdfComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ExportPdfComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ExportPdfComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
