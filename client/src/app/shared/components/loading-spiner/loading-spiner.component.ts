import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event/resized-event';

@Component({
	// tslint:disable-next-line
	selector: '[loadingSp]',
	templateUrl: './loading-spiner.component.html'
})
export class LoadingSpinerComponent implements OnInit {
	private static borderSizeRatio = 0.09;

	@Input()
	loadingSp = false;

	@Input()
	backgoundColor = 'transparent';

	@Input()
	innerSectionColor = '#FECD2F';

	@Input()
	outerSectionColor = '#29166F';

	@HostBinding('class.with-spiner')
	get isDisplay() {
		return this.loadingSp;
	}

	@Input()
	size = '50%';

	private doubleRingSize: number;

	constructor() {}

	ngOnInit() {}

	getInnerSectionStyle() {
		return {
			['border-width']: `${this.sectionSize}px`,
			['border-color']: `${this.innerSectionColor}`
		};
	}

	getOuterSectionStyle() {
		return {
			['border-width']: `${this.sectionSize}px`,
			['border-color']: `transparent ${this.outerSectionColor}`
		};
	}

	getDoubleRingStyle() {
		return {
			['width']: `${this.doubleRingSize}px`,
			['height']: `${this.doubleRingSize}px`
		};
	}

	getRingContainerStyle() {
		return {
			['width']: this.size,
			['height']: this.size,
			['max-width']: '100%',
			['max-height']: '100%'
		};
	}

	private get sectionSize() {
		return this.doubleRingSize * LoadingSpinerComponent.borderSizeRatio;
	}

	onRingResized(event: ResizedEvent): void {
		const { newHeight, newWidth } = event;
		this.doubleRingSize = newWidth < newHeight ? newWidth : newHeight;
	}
}
