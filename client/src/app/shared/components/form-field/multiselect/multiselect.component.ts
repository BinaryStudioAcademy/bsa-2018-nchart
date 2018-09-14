import { Component, OnInit, Input, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-multiselect',
	templateUrl: './multiselect.component.html'
})
export class MultiSelectComponent implements OnInit {
	@Input()
	items: SelectItem[];

	@Input()
	control: FormControl;

	@Output()
	selectedItems: any[];

	constructor() {}

	ngOnInit() {}
}
