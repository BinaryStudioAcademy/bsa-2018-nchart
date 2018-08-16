import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-link',
	templateUrl: './link.component.html'
})
export class LinkComponent implements OnInit {
	@Input()
	type: 'primary' | 'secondary' | 'underline' | 'shape' = 'primary';

	@Input()
	link: string = null;

	@Input()
	label = 'Text Link';

	@Input()
	icon: string = null;

	constructor() {}

	ngOnInit() {}

	getClasses() {
		return {
			['ui-link']: true,
			['ui-link-primary']: this.type === 'primary',
			['ui-link-secondary']: this.type === 'secondary',
			['ui-link-underline']: this.type === 'underline',
			['ui-link-shape']: this.type === 'shape'
		};
	}

	getIconClasses() {
		const iconClasses = this.icon
			.split(' ')
			.reduce((accum, curr) => Object.assign(accum, { [curr]: true }), {
				['icon']: true
			});

		return iconClasses;
	}
}
