import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNameComponent } from './project-name.component';

describe('StepperComponent', () => {
	let component: ProjectNameComponent;
	let fixture: ComponentFixture<ProjectNameComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProjectNameComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProjectNameComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
