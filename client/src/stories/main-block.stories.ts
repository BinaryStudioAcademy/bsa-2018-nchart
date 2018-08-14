import { storiesOf } from '@storybook/angular';
import '@storybook/addon-notes/register';

storiesOf('Main Block', module).add('Main Block', () => ({
	template: `	<div class="ui-main-block">First Block</div>
						<div class="ui-main-block">Second Block</div>
						<div class="ui-main-block">Fifth Block</div>
						<div class="ui-main-block">Seventh Block</div>`,
	props: {}
}));
