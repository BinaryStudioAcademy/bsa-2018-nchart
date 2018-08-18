import { Injectable } from '@angular/core';


@Injectable()
export class ChartService {

	dimensionSettings = [ {
		"multiple": false,
		"description": "For each unique value found in the column, a group (a new bar chart) is created.",
		"required": true,
		"variable": "X Axis",
		"type": [
		  "string",
		  "number"
		],
		"id": 1
	  },
	  {
		"multiple": false,
		"description": "For each unique value found in the column, a bar is created.",
		"required": false,
		"variable": "Group",
		"type": [
		  "string",
		  "number"
		],
		"id": 2
	  },
	  {
		"multiple": false,
		"description": "Accepts only columns containing numbers. The value will define the bar height.",
		"required": false,
		"variable": "Size",
		"type": [
		  "number"
		],
		"id": 3
	  },
	  {
		"multiple": false,
		"description": "Can accept both number and strings. A color will be defined for each unique value found in the list.",
		"required": false,
		"variable": "Color",
		"type": [
		  "string",
		  "number"
		],
		"id": 4
	  }]

	customizeSettings: [
		  {
			"defaultValue": 800,
			"description": "Artboard width in pixels.",
			"option": "Width",
			"id": 1
		  },
		  {
			"defaultValue": 600,
			"description": "Artboard height in pixels.",
			"option": "Height",
			"id": 2
		  },
		  {
			"defaultValue": 40,
			"description": "Margin for left side of a bar chart, in pixel.",
			"option": "Left Margin",
			"id": 3
		  },
		  {
			"defaultValue": 0,
			"description": "Distance among bar charts, in pixel.",
			"option": "Vertical Padding",
			"id": 4
		  },
		  {
			"defaultValue": 0.1,
			"description": "Distance between bars, in percentage of the size of the bar (0 = 0%, 1 = 100%).",
			"option": "Horizontal Padding",
			"id": 5
		  },
		  {
			"defaultValue": false,
			"description": "If set, every barchart element will have the same scale.",
			"option": "Use Same Scale",
			"id": 6
		  },
		  {
			"defaultValue": [{}],
			"description": "List of uniques values in the dimension mapped as “color”. If set to ordinal, you can set a color for each value. If set to linear, the app will try to find the minimum and maximum value contained in the dimension, and then creating a gradient among those two values.",
			"option": "Colour Scale",
			"id": 7
		  }
		]



	constructor(
	) {}
}

