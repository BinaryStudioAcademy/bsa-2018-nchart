import { Directive, Input, AfterViewInit, OnChanges, ElementRef } from '@angular/core';
import * as D3 from 'd3';

@Directive({
  selector: '[appAxis]'
})

export class AxisDirective {
  
  @Input() scale: any;
  @Input() orientation: 'vertical' | 'horizontal' = 'horizontal';
  initialized = false;
  constructor(private el: ElementRef) {}

  drawAxis() {
    switch (this.orientation) {
      case 'horizontal':
        D3.select(this.el.nativeElement).call(D3.axisBottom(this.scale));
        break;
      case 'vertical':
        D3.select(this.el.nativeElement).call(D3.axisLeft(this.scale));
    }
  }

  ngAfterViewInit() {
    // all the Inputs will be set before this gets called.
    // D3 needs to wait for view init to modify it
    this.initialized = true;
    this.drawAxis();
  }

  ngOnChanges() {
    if (this.initialized) {
      this.drawAxis();
    }
  }

}
