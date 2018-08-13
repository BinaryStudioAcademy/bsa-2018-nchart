import { Component, OnChanges, Input, ViewChild } from '@angular/core';
import { VirtualScrollComponent } from 'angular2-virtual-scroll';

@Component({
	selector: 'app-virtual-scroll-table',
	templateUrl: './virtual-scroll-table.component.html',
	styleUrls: ['./virtual-scroll-table.component.sass']
})
export class VirtualScrollTableComponent implements OnChanges {
	Object = Object; //Create pipe keyvalue for object itertable

	@Input()
	items: Array<any>[];
	scrollItems: Array<any>[];
	indices: any;

	filteredList: Array<any>[];

	@ViewChild(VirtualScrollComponent)
	private virtualScroll: VirtualScrollComponent;

	setToFullList() {
		this.filteredList = (this.items || []).slice();
	}

	ngOnChanges() {
		this.setToFullList();
	}

	getItemIndex(el, it) {
		let item = this.items[this.items.indexOf(it)];
		let i = 0;
		for (let key in item) {
			if (i === el.target.cellIndex) {
				item[key] = el.target.innerText;
			}
			i++;
		}
		console.log(this.items[this.items.indexOf(it)]);
	}
}
