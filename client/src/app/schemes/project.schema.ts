import {schema} from 'normalizr';

export const customData = new schema.Object(
	{'byId':{}},
);

export const projectCustomeSchema = new schema.Array(customData);
