import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
	// tslint:disable-next-line
	selector: '[loading-sp]',
	templateUrl: './loading-spinner.component.html'
})
export class LoadingSpinnerComponent implements OnInit {
	// tslint:disable-next-line
	@Input('loading-sp')
	loadingSp = false;

	@Input()
	backgoundColor = 'transparent';

	@Input()
	innerSectionColor = '#FECD2F';

	@Input()
	outerSectionColor = '#29166F';

	@HostBinding('class.with-spinner')
	isDisplay = true;

	@Input()
	spinnerSize: 'small' | 'middle' | 'big' = 'middle';

	constructor() {}

	ngOnInit() {}

	getDoubleRingClasses() {
		return {
			['lds-double-ring']: true,
			[this.spinnerSize]: true
		};
	}

	getInnerSectionStyle() {
		return {
			['border-color']: `${this.innerSectionColor}`
		};
	}

	getOuterSectionStyle() {
		return {
			['border-color']: `transparent ${this.outerSectionColor}`
		};
	}
}
