import { Component, OnChanges, Input } from '@angular/core';

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
	selectedList = [];
	selectAll = false;
	setToFullList() {
		this.filteredList = (this.payload.data || []).slice();
		this.selectedList.length = this.filteredList.length;
	}

	ngOnChanges() {
		this.setToFullList();
	}

	editItem(el, it) {
		if (el.target.cellIndex === 0 || el.target.cellIndex === 1) {
			return;
		}
		const target = el.target;
		const input = document.createElement('input');
		input.style.width = target.clientWidth + 'px';
		input.style.height = 25 + 'px';
		input.value = target.innerText;
		target.innerText = '';

		el.target.append(input);
		input.focus();

		input.addEventListener('blur', () => {
			target.innerText = input.value;
			input.remove();
		});
	}

	toggleDropdown(e) {
		e.stopPropagation();
		document.getElementById('Dropdown').classList.toggle('show');
	}
	turnoffDropdown(e) {
		if (!e.target.matches('.dropbtn')) {
			const myDropdown = document.getElementById('Dropdown');
			if (myDropdown.classList.contains('show')) {
				myDropdown.classList.remove('show');
			}
		}
	}

	isSelectAll() {
		this.selectAll = document
			.getElementById('selectAll')
			.getElementsByClassName('ui-chkbox-box')[0]
			.classList.contains('ui-state-active');
		if (this.selectAll) {
			for (let i = 0; i < this.filteredList.length; i++) {
				this.selectedList.splice(0);
				this.selectedList.push(true);
			}
		} else {
			for (let i = 0; i < this.filteredList.length; i++) {
				this.selectedList.splice(0);
				this.selectedList.push(false);
			}
		}
	}

	selectOne(event) {
		const isSelected = event.target.parentNode.classList.contains(
			'ui-state-active'
		);
		const index =
			event.target.parentNode.parentNode.parentNode.parentNode.firstChild
				.innerText - 1;
		this.selectedList.splice(index, 1, isSelected ? false : true);
	}
}
