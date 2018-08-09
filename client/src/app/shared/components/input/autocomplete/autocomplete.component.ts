import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
	selector: 'app-autocomplete',
	templateUrl: './autocomplete.component.html'
})
export class AutocompleteComponent implements OnInit {
	@Input()
	item: any;
	@Input()
	items: any[];
	@Input()
	placeholder: string;
	@Input()
	minLength: number;
	@Input()
	dropdown: boolean;
	@Input()
	control: FormControl;
	@Input()
	filterButton: boolean;

	filteredItems: any[];

	filterBrands(event) {
		this.filteredItems = [];
		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			if (item.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
				this.filteredItems.push(item);
			}
		}
	}

	constructor() {}

	ngOnInit() {}
}
