import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSettingsComponent } from '@app/features/draftproject/custom-settings/custom-settings.component';

describe('CustomSettingsComponent', () => {
	let component: CustomSettingsComponent;
	let fixture: ComponentFixture<CustomSettingsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CustomSettingsComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CustomSettingsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
