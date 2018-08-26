import { schema } from 'normalizr';

export const commonScheme = new schema.Entity(
	'byId',
	{},
	{
		idAttribute: 'id'
	}
);

export const arrayOfCommonScheme = new schema.Array(commonScheme);
