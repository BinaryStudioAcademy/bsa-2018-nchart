import {
	Component,
	Input,
	ElementRef,
	HostBinding,
	OnChanges
} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
	selector: 'app-animated-block',
	templateUrl: './main-block.component.html',
	animations: [
		trigger('grow', [
			transition('void <=> *', []),
			transition(
				'* <=> *',
				[
					style({ height: '{{ startHeight }}px' }),
					animate('.3s ease-out')
				],
				{ params: { startHeight: 0 } }
			)
		])
	]
})
export class MainBlockComponent implements OnChanges {
	constructor(private element: ElementRef) {}

	@HostBinding('class.animated-main-block')
	animated = true;

	@HostBinding('@grow')
	get grow() {
		return {
			value: this.pulse,
			params: {
				startHeight: this.startHeight
			}
		};
	}

	@Input()
	indicator: string;

	pulse: boolean;
	startHeight: number;

	setStartHeight() {
		this.startHeight = this.element.nativeElement.clientHeight;
	}

	ngOnChanges() {
		this.setStartHeight();
		this.pulse = !this.pulse;
	}
}
