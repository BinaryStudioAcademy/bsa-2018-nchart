import {
	Component,
	Input,
	OnInit
} from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
	selector: 'app-virtual-scroll-table',
	templateUrl: './virtual-scroll-table.component.html',
	styleUrls: ['./virtual-scroll-table.component.sass']
})
export class VirtualScrollTableComponent implements OnInit {
	@Input()
	payload;

	virtualData: any[][];
	totalRecords: number;
	selectedList: any[];
	selectedState: number[];
	columnTypes: any[];
	loading: boolean;
	flag: boolean;

	ngOnInit() {
		this.totalRecords = this.payload.data.length;
		this.loading = true;
		this.flag = false;
		this.selectedState = [];
		this.columnTypes = [
			"String",
			"Number",
			"Boolean",
			"Date"
		]
	}

	addSelection(event: LazyLoadEvent, data) {
	}

	editItem(e) {
		// if (el.target.cellIndex === 0 || el.target.cellIndex === 1) {
		// 	return;
		// }
		// const target = el.target;
		// const input = document.createElement('input');
		// input.style.width = target.clientWidth + 'px';
		// input.style.height = 25 + 'px';
		// input.value = target.innerText;
		// target.innerText = '';
		// el.target.append(input);
		// input.focus();
		// input.addEventListener('blur', () => {
		// 	target.innerText = input.value;
		// 	input.remove();
		// });
	}

	changeType(event, type, colType){
		event.stopPropagation();
		let index = event.path[1].id[event.path[1].id.length-1];
		this.payload.columns[index].type = type;
		document.getElementById('Dropdown' + index).classList.toggle('show');
	}

	removeColumn(event){
		event.stopPropagation();
		let index = +event.path[1].id[event.path[1].id.length-1];
		let temp = this.payload.columns.slice(index+1);
		this.payload.columns = this.payload.columns.slice(0, index).concat(temp);
		this.removeDataColumn(index);
		document.getElementById('Dropdown' + index).classList.toggle('show');
	}

	removeRows(event){
		event.stopPropagation();
		console.log(this.payload.data.length);
		this.payload.data = this.payload.data.slice(1,5);
		console.log(this.payload.data.length);
	}

	removeDataColumn(index){
		this.payload.data.forEach((el, i) => {
			// console.log(el.slice(index+1));
			// console.log(el.slice(0, index));
			el = el.slice(0, index).concat(el.slice(index+1));
			this.payload.data[i] = new Array(el);
			console.log(this.payload);
		});
	}

	toggleDropdown(e) {
		e.stopPropagation();
		let id = -1;
		if (e.target.id){
			id = e.target.id;
		} else {
			id = e.target.parentNode.id
		}
		document.getElementById('Dropdown' + id).classList.toggle('show');
	}
	turnoffDropdown(e) {
		if (!e.target.matches('.dropbtn')) {
			for(let i = 0; i < this.payload.columns.length; i++){
				let myDropdown = document.getElementById('Dropdown' + i);
				if (myDropdown.classList.contains('show')) {
					myDropdown.classList.remove('show');
				}
			}
			let myDropdown = document.getElementById('Dropdown');
			if (myDropdown.classList.contains('show')) {
				myDropdown.classList.remove('show');
			}
		}
	}

	isSelectAll() {
		this.flag = !this.flag;
		if(this.flag){
			for(let i = 0; i < this.payload.data.length; i++){
				this.selectedState.push(i);
			}
		} else{
			this.selectedState = new Array<number>();
		}
	}

	selectOne(event, item) {
		// const isSelected = event.path[0].classList.contains('ui-state-active');
		// const index = this.filteredList.indexOf(item);
		// this.selectedList.splice(index, 1, isSelected);
		// console.log(this.chkbox.toArray()[10]);
		// console.log((this.chkbox.toArray()[10].checked = true));
	}

	loadDataOnScroll(event: LazyLoadEvent) {
		this.loading = true;
		setTimeout(() => {
			this.virtualData = this.payload.data.slice(
				event.first,
				event.first + event.rows
			);

			this.loading = false;
		}, 200);
	}
}
