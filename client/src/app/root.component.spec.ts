import { TestBed, async } from '@angular/core/testing';
import { RootComponent } from '@app/root.component';
describe('RootComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RootComponent]
		}).compileComponents();
	}));
	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(RootComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
	it(`should have as title 'client'`, async(() => {
		const fixture = TestBed.createComponent(RootComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual('client');
	}));
	it('should render title in a h1 tag', async(() => {
		const fixture = TestBed.createComponent(RootComponent);
		fixture.detectChanges();
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('h1').textContent).toContain(
			'Welcome to client!'
		);
	}));
});
