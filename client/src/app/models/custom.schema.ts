import { schema } from 'normalizr';

export const customData = new schema.Entity(
	'byId',
	{},
	{
		idAttribute: 'id'
	}
);

export const arrayOfCustomData = new schema.Array(customData);
