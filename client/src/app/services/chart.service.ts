import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { BarChartCustomizeSettings } from '@app/shared/components/charts/bar-chart/bar-chart.model';

@Injectable()
export class ChartService {

	barChartCustomizeSettings: BarChartCustomizeSettings =  {
			width:800, 
			height:600,
			leftMargin:40,
			verticalPadding:20,
			innerPadding:0.2,
			outerPadding:0.2,
			isSameScaling:false
		};
		
		data : Array<any>
		values : Array<number>

		originalData = [
			'Jan', 'Feb', 'Mar', 
			'Jan', 'Mar', 'Apr',
			'Jan', 'Jun', 'Jul'
		]

		testData = [
			'1', '2', '3', 
			'7', '8', '5',
			'1', '2', '3', 
			'4', '5', '6',
			'7', '5', '9',
			'3', '2', '3', 
			'4', '5', '6',
			'5', '2', '3', 
			'4', '5', '5',
			'7', '8', '9'
		]

		originalValues = [
			1, 2, 3,
			4, 5, 6,
			7, 8, 9
		]
	
		private _barChartCustomizeSettings = new BehaviorSubject<BarChartCustomizeSettings>(this.barChartCustomizeSettings)
		barChartCustomizeSettingsObs = this._barChartCustomizeSettings.asObservable();

		private _data = new BehaviorSubject<Array<any>>(this.data);
		dataObs = this._data.asObservable();

		private _values = new BehaviorSubject<Array<number>>(this.values);
		valuesObs = this._values.asObservable();

		private _range = new BehaviorSubject<number>(0);
		rangeObs = this._range.asObservable();


		setData(data: Array<any>){
			this._data.next(data);
		}

		setValues(){
			this.data = compressArray(mapValues(mapData(this.originalData), this.originalValues));
			this.setRange();
			this._data.next(this.data);
		}

		setCustomizeSettings(settings : BarChartCustomizeSettings){
			this._barChartCustomizeSettings.next(settings);
		}

		setRange(){
			this._range.next(this.getRange());
		}
		
		getRange(){
			return Math.max(...this.data.map(o => o.value));
		}

		initData(data:Array<any>){
				this.originalData = data;
				this.data = compressArray(mapData(this.originalData));
				this.data = mapColors(this.data);
				this.setData(this.data);
				this.setRange();
		}

	constructor() {
		/*this.values = this.originalValues;
		this.data = compressArray(mapData(this.originalData));
		this.data = mapColors(this.data);
		this.setData(this.data);
		this.setRange();	*/
	}
	
}
				


export function mapData(original : Array<any>) {
	return original.map((name: string | number) => (
			{
		  name: name,
			value: 1,
			color: "#1785FC"
			}
		))
}

export function mapValues(original : Array<any>, values : Array <number>){
	return original.map((obj) => (
				{
					name: obj.name,
					value: values[original.indexOf(obj)],
					color: obj.color
				}
			))
}

export function mapColors(original : Array<any>){
	return original.map((obj) => (
		{
			name: obj.name,
			value: obj.value,
			color: '#'+Math.random().toString(16).substr(2,6)
		}
	))
}

export function compressArray(original) {
	let compressed = [];
	let copy = original.slice(0);
	for (let i = 0; i < original.length; i++) {
		let myCount = 0;	
		for (let w = 0; w < copy.length; w++) {
			if (original[i].name === copy[w].name) {
				myCount+=original[i].value;
				let a = {
					name:"",
					value: 0,
					color: ""
				}
				copy[w] = a;
			}
		}
 
		if (myCount > 0) {
			let a = {
				name:"",
				value: 0,
				color: ""
			}
			a.name = original[i].name;
			a.value = myCount;
			a.color = original[i].color;
			compressed.push(a);
		}
	}
  
	return compressed;
};
