import { Component, OnInit } from '@angular/core';
import { ChartService } from '@app/services/chart.service';
import { BarChartCustomizeSettings } from 'app/shared/components/charts/bar-chart/bar-chart';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
	selector: 'app-customize-chart',
	templateUrl: './customize-chart.component.html',
	styleUrls: ['./customize-chart.component.sass']
})
export class CustomizeChartComponent implements OnInit {
	/*constructor(private _chartService: ChartService) {}
	width: number = 500;
	height: number = 500;
	leftMargin:number = 40;
	horizontalPadding: number = 0.1;
	barChartCustomizeSettings: BarChartCustomizeSettings;
	subs = new Subscription();
	ngOnInit() {
		
	}
	setWidth(){
		this._chartService.setWidth(this.width)
	}
	setHeight(){
		this._chartService.setHeight(this.height)
	}
	setLeftMargin(){
		this._chartService.setLeftMargin(this.leftMargin)
	}
	setHorizontalPadding(){
		this._chartService.setHorizontalPadding(this.horizontalPadding)
	}
	ngOnDestroy(){
		this.subs.unsubscribe;
	}*/

	form: FormGroup;
	customizeSettings = {
		width: 800,
		height: 600,
		leftMargin: 40,
		verticalPadding:0,
		horizontalPadding:0,
		useSameScale:{ option:"Use the same scale", defaultValue:true },
		sortBarsBy: [{ label: 'Sort by bar', value: null }, { label: 'By bar (ascending)', value: "asc" }, { label: 'By bar (descending)', value: "desc" }]
	}

	customizeNumberProps = []
	customizeBooleanProps = []
	customizeArrayProps = []

	constructor(private _chartService: ChartService) {}

	ngOnInit() {
		const formDataObj = {};

		for(const prop of Object.keys(this.customizeSettings)){	
			if(this.isNumber(this.customizeSettings[prop])){
				formDataObj[prop] = new FormControl(this.customizeSettings[prop]);
				this.customizeNumberProps.push(prop);
			}
			if(this.isBoolean(this.customizeSettings[prop].defaultValue)){
				formDataObj[prop] = new FormControl(this.customizeSettings[prop].defaultValue);
				let booleanProp = {
					option:this.customizeSettings[prop].option,
					control:formDataObj[prop]
				}
				this.customizeBooleanProps.push(booleanProp);
			}
			if(this.isArray(this.customizeSettings[prop])){
				formDataObj[prop] = new FormControl(this.customizeSettings[prop][0].value);
				let arrayProp = {
					control:prop,
					options:this.customizeSettings[prop]
				}
				this.customizeArrayProps.push(arrayProp);	
			}
		}
		this.form = new FormGroup(formDataObj);
		this.onChanges();
	}

	isString (value) {
		return typeof value === 'string' || value instanceof String;
	}

	isNumber (value) {
		return typeof value === 'number' && isFinite(value);
	}

	isArray (value) {
		return value && typeof value === 'object' && value.constructor === Array;
	}
	isBoolean (value) {
		return typeof value === 'boolean';
	}
	
	onChanges(){
		/*this.form.valueChanges.subscribe(val => {
			this._chartService.setWidth(val.)
		  });*/
		this.form.get('width').valueChanges.subscribe(val => {
			this._chartService.setWidth(val)
		  });
	}
}


