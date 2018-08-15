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
			value: [{ variable: 'Box office', type: 'number' }]
		}
	];

	public test = ['Movie', 'Genre'];

	public columns = [
		{ variable: 'Movie', type: 'string' },
		{ variable: 'Genre', type: 'number' },
		{ variable: 'Box office', type: 'number' }
	];
	public dimensions = [];

	subs = new Subscription();
	constructor(private _dragulaService: DragulaService) {
		_dragulaService.createGroup(this.DIMENSIONS, {
			copy: (el, source) => {
				return source.id === 'columns';
			},
			copyItem: (column: Column) => {
				return new Column(column.variable, column.type);
			},
			accepts: (el, target, source, sibling) => {
				if (target.parentElement.classList.contains('single')) {
					return false;
				}
				if (target.parentElement.classList.contains('multiple')) {
					return true;
				}
				return target.id !== 'columns';
			},
			removeOnSpill: true
		});

		this.subs.add(
			this._dragulaService
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
						if (source.children.length === 0) {
							source.parentElement.classList.remove('single');
						}
						if (
							!target.parentElement.classList.contains('multiple')
						) {
							target.parentElement.classList.add('single');
						}
						if (this.hasDuplicates(targetModel)) {
							targetModel.splice(targetModel.indexOf(item), 1);
						}
					}
				)
		);

		this.subs.add(
			this._dragulaService
				.removeModel(this.DIMENSIONS)
				.subscribe(({ el, source, sourceModel, item }) => {
					if (source.parentElement.children.length <= 2) {
						source.parentElement.classList.remove('single');
					}
				})
		);
	}

	ngOnInit() {}

	getClasses(multiple, required) {
		return {
			multiple: multiple,
			required: required
		};
	}

	hasDuplicates(array) {
		length = array.length;
		array = array.filter(
			(thing, index, self) =>
				index === self.findIndex(t => t.variable === thing.variable)
		);
		return length !== array.length;
	}

	remove(x, values) {
		values.splice(values.indexOf(x), 1);
	}

	ngOnDestroy() {
		this.subs.unsubscribe();
	}
}
