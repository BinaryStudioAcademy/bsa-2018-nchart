import { Component, OnChanges, Input } from '@angular/core';
import {} from '@app/shared/components/form-field/form-field.module';

@Component({
	selector: 'app-virtual-scroll-table',
	templateUrl: './virtual-scroll-table.component.html',
	styleUrls: ['./virtual-scroll-table.component.sass']
})
export class VirtualScrollTableComponent implements OnChanges {
	@Input()
	payload;

	scrollItems: Array<any>[];
	filteredList: Array<any>[];

	setToFullList() {
		this.filteredList = (this.payload.data || []).slice();
	}

	ngOnChanges() {
		this.setToFullList();
	}

	editItem(el, it) {
		if (el.target.cellIndex == 0 || el.target.cellIndex == 1) return;
		let input = document.createElement('input');
		input.style.width = el.target.clientWidth + 'px';
		input.style.height = 25 + 'px';
		// let placeholder = el.target.innerText;
		// input.value = placeholder;
		el.target.innerText = '';

		el.target.append(input);
		input.focus();

		input.addEventListener('keypress', e => {
			if (e.keyCode == 13) {
				el.target.innerText = input.value;
				input.remove();
				console.log(this.filteredList.indexOf(it));
				console.log(el.target.cellIndex - 2);
				// сhangeContent(el.target.innerText, this.filteredList.indexOf(it), el.target.cellIndex + 2);
			}
		});
	}
}
