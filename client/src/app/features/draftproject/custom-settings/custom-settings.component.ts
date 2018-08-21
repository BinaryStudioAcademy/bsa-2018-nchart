import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { mappingColumns } from '@app/store/selectors/charts.selectors';
import { UserMappingColumn } from '@app/models/user-chart-store.model';

@Component({
	selector: 'app-custom-settings',
	templateUrl: './custom-settings.component.html',
	styleUrls: ['./custom-settings.component.sass']
})
export class CustomSettingsComponent implements OnInit, OnDestroy {
	constructor(private storeService: StoreService) {
		this.onMappingColumnsUpdate = this.onMappingColumnsUpdate.bind(this);
	}

	disconnect: () => void;
	columns: UserMappingColumn[] = [];

	public dimensionsSettings = [
		{
			variable: 'X-Axis',
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

	ngOnInit() {
		this.disconnect = this.storeService.connect([
			{
				selector: mappingColumns(),
				subscriber: this.onMappingColumnsUpdate
			}
		]);
	}

	onMappingColumnsUpdate(columns: UserMappingColumn[]) {
		this.columns = columns;
	}

	ngOnDestroy(): void {
		this.disconnect();
	}
}
