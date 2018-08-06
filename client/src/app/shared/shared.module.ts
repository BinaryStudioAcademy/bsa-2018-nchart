import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import { SecondaryButtonComponent } from './components/buttons/secondary-button.component';
import { DefaultButtonComponent } from './components/buttons/default-button.component';


@NgModule({
	imports: [ButtonModule],
	exports: [SecondaryButtonComponent, DefaultButtonComponent],
	declarations: [SecondaryButtonComponent, DefaultButtonComponent]
})
export class SharedModule {}
