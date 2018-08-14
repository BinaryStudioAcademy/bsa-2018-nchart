import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Chart } from '@app/models';
import { normalize } from 'normalizr';
import { arrayOfCustomData } from '@app/models/custom.schema';
import { ChartsActionConstants } from '@app/store/actions/charts/charts.action-types';
import {
	LoadDataComplete,
	LoadDataFailed
} from '@app/store/actions/charts/charts.actions';

@Injectable()
export class ChartsEffects {
	api = {
		loadCharts: (): Observable<Chart[]> => {
			return of([
				{
					id: 1,
					type: '1',
					name: 'Bar chart',
					description: 'bar chbars with ent.',
					dimension_settings: [
						{
							variable: 'X Axis',
							multiple: false,
							required: true,
							type: ['string', 'number'],
							description: 'For d.'
						},
						{
							variable: 'Group',
							multiple: false,
							required: false,
							type: ['string', 'number'],
							description: 'For each reated.'
						},
						{
							variable: 'Size',
							multiple: false,
							required: false,
							type: ['number'],
							description: 'Acceptbar height.'
						},
						{
							variable: 'Color',
							multiple: false,
							required: false,
							type: ['string', 'number'],
							description: 'Can  the list.'
						}
					],
					customize_settings: [
						{
							value: 800,
							option: 'Width',
							description: 'artboard width in pixels'
						},
						{
							value: 600,
							option: 'Height',
							description: 'artboard height in pixels'
						},
						{
							value: 40,
							option: 'Left Margin',
							description: 'margin fopixel'
						},
						{
							value: 0,
							option: 'Vertical Padding',
							description: 'distharts, in pixel'
						},
						{
							value: 0.1,
							option: 'Horizontal Padding',
							description: 'distance 0%, 1 = 100%)'
						},
						{
							value: false,
							option: 'Use Same Scale',
							description: 'If set, every bcale'
						},
						{
							value: [],
							option: 'Colour Scale',
							description: 'list and mose two values'
						}
					]
				},
				{
					id: 2,
					type: '2',
					name: 'Linear chart',
					description: 'Linear that they represent.',
					dimension_settings: [
						{
							variable: 'X Axis',
							multiple: false,
							required: true,
							type: ['string', 'number'],
							description: 'For each unique value ted.'
						},
						{
							variable: 'Group',
							multiple: false,
							required: false,
							type: ['string', 'number'],
							description: 'For reated.'
						},
						{
							variable: 'Size',
							multiple: false,
							required: false,
							type: ['number'],
							description: 'Accepts  height.'
						},
						{
							variable: 'Color',
							multiple: false,
							required: false,
							type: ['string', 'number'],
							description: 'Canin the list.'
						}
					],
					customize_settings: [
						{
							value: 800,
							option: 'Width',
							description: 'artboard width in pixels'
						},
						{
							value: 600,
							option: 'Height',
							description: 'artboard height in pixels'
						},
						{
							value: 40,
							option: 'Left Margin',
							description:
								'margin for left side of a bar chart, in pixel'
						},
						{
							value: 0,
							option: 'Vertical Padding',
							description: 'distance among bar charts, in pixel'
						},
						{
							value: 0.1,
							option: 'Horizontal Padding',
							description: 'distance between b 100%)'
						},
						{
							value: false,
							option: 'Use Same Scale',
							description: 'If set, eveme scale'
						},
						{
							value: [],
							option: 'Colour Scale',
							description: 'liong those two values'
						}
					]
				},
				{
					id: 3,
					type: '3',
					name: 'Other chart',
					description: 'Other that they represent.',
					dimension_settings: [
						{
							variable: 'X Axis',
							multiple: false,
							required: true,
							type: ['string', 'number'],
							description: 'For ted.'
						},
						{
							variable: 'Group',
							multiple: false,
							required: false,
							type: ['string', 'number'],
							description: 'For eated.'
						},
						{
							variable: 'Size',
							multiple: false,
							required: false,
							type: ['number'],
							description: 'Accepts only column height.'
						},
						{
							variable: 'Color',
							multiple: false,
							required: false,
							type: ['string', 'number'],
							description: 'C the list.'
						}
					],
					customize_settings: [
						{
							value: 800,
							option: 'Width',
							description: 'artboard width in pixels'
						},
						{
							value: 600,
							option: 'Height',
							description: 'artboard height in pixels'
						},
						{
							value: 40,
							option: 'Left Margin',
							description: 'marginpixel'
						},
						{
							value: 0,
							option: 'Vertical Padding',
							description: 'dista, in pixel'
						},
						{
							value: 0.1,
							option: 'Horizontal Padding',
							description: 'dis= 100%)'
						},
						{
							value: false,
							option: 'Use Same Scale',
							description: 'If setthe same scale'
						},
						{
							value: [],
							option: 'Colour Scale',
							description:
								'list o a gradient among those two values'
						}
					]
				}
			]);
		}
	};

	constructor(private action$: Actions) {}

	@Effect()
	loadData$ = this.action$.pipe(
		ofType(ChartsActionConstants.CHARTS_LOAD_DATA),
		switchMap((action: any) =>
			this.api.loadCharts().pipe(
				map((value: Array<Chart>) => {
					const {
						result: all,
						entities: { byId }
					} = normalize(value, arrayOfCustomData);
					return new LoadDataComplete({
						charts: {
							all,
							byId
						}
					});
				}),
				catchError(error => {
					return of(
						new LoadDataFailed({
							action: action,
							msg: 'test',
							error
						})
					);
				})
			)
		)
	);
}
