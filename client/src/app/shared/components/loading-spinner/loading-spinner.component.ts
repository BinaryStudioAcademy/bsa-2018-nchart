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
	spBackgroundColor = 'transparent';

	@Input()
	spInnerSectionColor = '#29166F';

	@Input()
	spOuterSectionColor = '#29166F';

	@HostBinding('class.with-spinner')
	isDisplay = true;

	@Input()
	spSize: 'small' | 'middle' | 'big' = 'middle';

	constructor() {}

	ngOnInit() {}

	getDoubleRingClasses() {
		return {
			['lds-double-ring']: true,
			[this.spSize]: true
		};
	}

	getInnerSectionStyle() {
		return {
			['border-color']: `${this.spInnerSectionColor}`
		};
	}

	getOuterSectionStyle() {
		return {
			['border-color']: `transparent ${this.spOuterSectionColor}`
		};
	}
}
