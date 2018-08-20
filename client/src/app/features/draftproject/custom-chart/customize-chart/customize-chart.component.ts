import { Component, OnInit } from '@angular/core';
import { ChartService } from '@app/services/chart.service';
import { BarChartCustomizeSettings } from '@app/shared/components/charts/bar-chart/bar-chart';
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
		boolean:true,
		height: 600,
		leftMargin: 40,
		verticalPadding:0,
		horizontalPadding:0,
		useSameScale:false,
		//colorScale:[],
		sortBarsBy: "sortBarsBy"
	}

	customizeNumberProps = []
	customizeBooleanProps = []
	customizeArrayProps = []

	options = [{label: "1"},{label: "1"}]
	formControl = new FormControl()

	constructor() {}

	ngOnInit() {
		const formDataObj = {};

		for(const prop of Object.keys(this.customizeSettings)){
			formDataObj[prop] = new FormControl(this.customizeSettings[prop]);
			if(this.isNumber(this.customizeSettings[prop])){
				this.customizeNumberProps.push(prop);
			}
			if(this.isBoolean(this.customizeSettings[prop])){
				this.customizeBooleanProps.push(prop);
			}
			if(prop==="sortBarsBy"){
				this.customizeArrayProps.push(prop);	
			}
		}
		this.form = new FormGroup(formDataObj);
		console.log(this.form.controls["sortBarsBy"]);
		console.log(this.customizeArrayProps);
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
		
}


