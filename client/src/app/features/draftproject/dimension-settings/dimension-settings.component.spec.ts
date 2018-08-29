import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DimensionSettingsComponent } from '@app/features/draftproject/dimension-settings/dimension-settings.component';

describe('DimensionSettingsComponent', () => {
	let component: DimensionSettingsComponent;
	let fixture: ComponentFixture<DimensionSettingsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DimensionSettingsComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DimensionSettingsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
