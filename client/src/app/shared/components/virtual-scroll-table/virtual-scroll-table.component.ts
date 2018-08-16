import { Component, OnChanges, Input, EventEmitter } from '@angular/core';

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

	addSelection(event) {
		const rows = document.getElementsByClassName('list');
		for (let i = event.start; i <= event.end; i++) {
			if (this.selectedList[i] === true) {
				for (let j = 0; j < rows.length; j++) {
					if (
						+rows[j].getElementsByTagName('td')[0].innerText - 1 ===
						i
					) {
						rows[j]
							.getElementsByClassName('ui-chkbox-box')[0]
							.classList.add('ui-state-active');
						rows[j]
							.getElementsByClassName('ui-chkbox-box')[0]
							.getElementsByTagName('span')[0]
							.classList.add('pi', 'pi-check');
					}
				}
			} else {
				for (let j = 0; j < rows.length; j++) {
					if (
						+rows[j].getElementsByTagName('td')[0].innerText - 1 ===
						i
					) {
						rows[j]
							.getElementsByClassName('ui-chkbox-box')[0]
							.classList.remove('ui-state-active');
						rows[j]
							.getElementsByClassName('ui-chkbox-box')[0]
							.getElementsByTagName('span')[0]
							.classList.remove('pi', 'pi-check');
					}
				}
			}
		}
	}

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
		const selectAll = document
			.getElementById('selectAll')
			.getElementsByClassName('ui-chkbox-box')[0]
			.classList.contains('ui-state-active');
		this.selectedList.splice(0);
		if (selectAll) {
			for (let i = 0; i < this.filteredList.length; i++) {
				this.selectedList.push(true);
			}
		} else {
			for (let i = 0; i < this.filteredList.length; i++) {
				this.selectedList.push(false);
			}
		}
		EventEmitter.call(this.addSelection({ start: 0, end: 10 }));
	}

	selectOne(event, item) {
		const isSelected = event.path[0].classList.contains('ui-state-active');
		const index = this.filteredList.indexOf(item);
		this.selectedList.splice(index, 1, isSelected);
	}
}
