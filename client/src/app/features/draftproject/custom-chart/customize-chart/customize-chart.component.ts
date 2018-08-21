import { Component, OnInit } from '@angular/core';
import { ChartService } from '@app/services/chart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { minValidator } from '@app/shared/components/form-field/form-validators';
@Component({
	selector: 'app-customize-chart',
	templateUrl: './customize-chart.component.html',
	styleUrls: ['./customize-chart.component.sass']
})
export class CustomizeChartComponent implements OnInit {

	form: FormGroup;

	customizeSettings = {
		width: {option: "Width", value: 800},
		height: {option: "Height", value: 600},
		leftMargin: {option: "Left margin", value: 40},
		verticalPadding: {option: "Vertical padding", value: 17},
		innerPadding: {option: "Inner padding", value: 0.2},
		outerPadding: {option: "Outer padding", value: 0.2},
		isSameScaling: {option: "Use same Scaling", value: true}
	} 

	customizeNumberProps = []
	customizeBooleanProps = []
	customizeArrayProps = []

	constructor(private _chartService: ChartService) {}

	ngOnInit() {
		const formDataObj = {};

		for(const prop of Object.keys(this.customizeSettings)){	
			if(this.isNumber(this.customizeSettings[prop].value)){
				formDataObj[prop] = new FormControl(this.customizeSettings[prop].value, [minValidator('Minimum value is',0)]);
				let numberProp = {
					option:this.customizeSettings[prop].option,
					control:formDataObj[prop],
					step: this.customizeSettings[prop].value > 5 ? 1 : 0.1
				}
				this.customizeNumberProps.push(numberProp);
			}
			if(this.isBoolean(this.customizeSettings[prop].value)){
				formDataObj[prop] = new FormControl(this.customizeSettings[prop].value);
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
		this.form.valueChanges.subscribe(val => {
			console.log(this.form.valid)
			console.log(this.form)
			console.log(val)
			if(this.form.valid){
			this._chartService.setCustomizeSettings(val)
			}
		  });
	}
}


