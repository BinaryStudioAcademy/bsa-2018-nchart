import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualScrollTableComponent } from './virtual-scroll-table.component';

describe('VirtualScrollTableComponent', () => {
	let component: VirtualScrollTableComponent;
	let fixture: ComponentFixture<VirtualScrollTableComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [VirtualScrollTableComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(VirtualScrollTableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
