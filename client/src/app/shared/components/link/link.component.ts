import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-link',
	templateUrl: './link.component.html'
})
export class LinkComponent implements OnInit {
	@Input()
	type: 'primary' | 'secondary' | 'underline' = 'primary';

	@Input()
	link: string = null;

	@Input()
	label: string = null;

	@Input()
	icon: string = null;

	@Input()
	shape: string = null;

	@Input()
	displayWith: 'icon' | 'shape';

	constructor() {}

	private static mapClassesToObject(
		classes: string | string[]
	): { [key: string]: boolean } {
		const classesArray = Array.isArray(classes)
			? classes
			: classes.split(' ');

		return classesArray.reduce((obj, item) => {
			obj[item] = true;
			return obj;
		}, {});
	}

	ngOnInit() {
		this.displayWith = this.detectDisplayWith();
	}

	detectDisplayWith() {
		return this.displayWith
			? this.displayWith
			: this.icon
				? 'icon'
				: this.shape
					? 'shape'
					: null;
	}

	getClasses() {
		return {
			['ui-link']: true,
			['ui-link-primary']: this.type === 'primary',
			['ui-link-secondary']: this.type === 'secondary',
			['ui-link-underline']: this.type === 'underline'
		};
	}

	getIconClasses() {
		return LinkComponent.mapClassesToObject(`icon ${this.icon}`);
	}

	getShapeClasses() {
		return LinkComponent.mapClassesToObject(`shape ${this.shape}`);
	}
}
