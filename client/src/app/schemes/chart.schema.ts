import { schema } from 'normalizr';

export const chartScheme = new schema.Entity('chart', {
	dimensionSettings: [new schema.Entity('dimensionSetting')],
	customizeSettings: [new schema.Entity('customizeSetting')]
});
