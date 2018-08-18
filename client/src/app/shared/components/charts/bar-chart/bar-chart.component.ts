import { Component, Input, OnChanges } from '@angular/core';
import * as d3 from 'd3';

export type Datum = {name: string, value: number};

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.sass']
})
export class BarChartComponent implements OnChanges {
  
  @Input() height = 500;
  @Input() width = 900;
  @Input() data: Datum[] = [];
  @Input() range = 200;
  @Input() paddingLeft = 30;
  @Input() paddingBottom = 30;
 
  
  xScale: d3.ScaleBand<string> = null;
  yScale: d3.ScaleLinear<number, number> = null;
  transform = '';
  axisBottomTransform = '';
  axisLeftTransform = ''
  chartWidth = this.width - this.paddingLeft;
  chartHeight = this.height - this.paddingBottom;
  barHeights: number[] = [];
  barWidth = 0;
  xCoordinates: number[] = [];
  
  // Input changed, recalculate using D3
  ngOnChanges() {
    this.xScale = d3.scaleBand()
      .domain(this.data.map((item: Datum)=>item.name)).range([0, this.chartWidth])
      .paddingInner(0.5);
    this.yScale = d3.scaleLinear()
      .domain([0, this.range])
      .range([this.chartHeight, 0]);

    this.barWidth = this.xScale.bandwidth();
    this.barHeights = this.data.map((item: Datum) =>this.barHeight(item.value));
    this.xCoordinates = this.data.map((item: Datum) => this.xScale(item.name));
    
    // use transform to flip the chart upside down, so the bars start from bottom
    this.transform = `scale(1, -1) translate(${this.paddingLeft}, ${- this.chartHeight})`;
    this.axisBottomTransform = `translate(${this.paddingLeft}, ${this.chartHeight})`;
    this.axisLeftTransform = `translate(${this.paddingLeft}, 0)`;
  }

  clampHeight(value: number) {
    if (value < 0) {
      return 0;
    }
    if (this.chartHeight <= 0) {
      return 0
    }
    if (value > this.chartHeight) {
      return this.chartHeight;
    }
    return value;
  }

  barHeight(value) {
    return this.clampHeight(this.chartHeight - this.yScale(value));
  }

}