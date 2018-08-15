import { Component, OnInit, Input } from '@angular/core';
import { DragulaService, DrakeFactory, MockDrake } from 'ng2-dragula';
import { Subscription } from 'rxjs';

class Column {
	constructor(public variable: string, public type: Array<String>) {}
}

@Component({
	selector: 'app-drag-drop',
	templateUrl: './drag-drop.component.html'
})
export class DragDropComponent implements OnInit {
	DIMENSIONS = 'DIMENSIONS';
	public dimensionsSettings = [
		{
			variable: 'X Axis',
			multiple: false,
			required: true,
			type: ['string', 'number'],
			description:
				'For each unique value found in the column, a group (a new bar chart) is created.',
			value: []
		},
		{
			variable: 'Group',
			multiple: false,
			required: false,
			type: ['string', 'number'],
			description:
				'For each unique value found in the column, a bar is created.',
			value: []
		},
		{
			variable: 'Size',
			multiple: false,
			required: false,
			type: ['number'],
			description:
				'Accepts only columns containing numbers. The value will define the bar height.',
			value: []
		},
		{
			variable: 'Color',
			multiple: true,
			required: false,
			type: ['string', 'number'],
			description:
				'Can accept both number and strings. A color will be defined for each unique value found in the list.',
			value: []
		}
	];

	public columns = [
		{ variable: 'Movie', type: 'string' },
		{ variable: 'Genre', type: 'number' }
	];
	public dimensions = [];
	public single = false;
	public dragged: any;
	subs = new Subscription();
	constructor(private dragulaService: DragulaService) {
		dragulaService.createGroup(this.DIMENSIONS, {
			copy: (el, source) => {
				return source.id === 'columns';
			},
			copyItem: (column: Column) => {
				return new Column(column.variable, column.type);
			},
			accepts: (el, target, source, sibling) => {
				if (target.classList.contains('single')) {
					return false;
				}
				if (target.classList.contains('multiple')) {
					if (target.contains(el)) {
						return false;
					}
					return true;
				}
				return target.id !== 'columns';
			}
		});

		this.subs.add(
			this.dragulaService
				.dropModel(this.DIMENSIONS)
				.subscribe(
					({
						el,
						target,
						source,
						sourceModel,
						targetModel,
						item
					}) => {
						if (this.hasDuplicates(targetModel)) {
							target.appendChild(el);
						} else {
							targetModel.splice(targetModel.indexOf(item), 1);
						}
						if (source.children.length === 0) {
							source.classList.remove('single');
						}
						if (!target.classList.contains('multiple')) {
							target.classList.add('single');
						}
					}
				)
		);

		this.subs.add(
			this.dragulaService
				.removeModel(this.DIMENSIONS)
				.subscribe(({ el, source, sourceModel, item }) => {})
		);

		this.subs.add(
			this.dragulaService
				.drag(this.DIMENSIONS)
				.subscribe(({ el, source }) => {})
		);
	}

	ngOnInit() {
		this.dragulaService
			.drag(this.DIMENSIONS)
			.subscribe(({ name, el, source }) => {
				/* console.log(name);
            console.log(el);
            console.log(source);*/
				this.dragged = el;
			});
		this.dragulaService
			.drop(this.DIMENSIONS)
			.subscribe(({ el, target, source, sibling }) => {
				/* console.log(el);
            console.log(target);
            console.log(source);
            console.log(target.contains(el));*/
				// console.log(this.dimensionsSettings[0].value);
				// console.log(this.dimensionsSettings[1].value);
				//  console.log(this.dimensionsSettings[2].value);
				this.dragged = el;
			});
		this.dragulaService
			.cancel(this.DIMENSIONS)
			.subscribe(({ el, container, source }) => {});
	}

	getClasses(multiple) {
		return { multiple: multiple };
	}

	hasDuplicates(array) {
		length = array.length;
		array = array.filter(
			(thing, index, self) =>
				index === self.findIndex(t => t.variable === thing.variable)
		);
		return length === array.length;
	}

	ngOnDestroy() {
		this.subs.unsubscribe();
	}
}
