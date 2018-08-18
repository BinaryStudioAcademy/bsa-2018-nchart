export type SchemeID = number | string;

export type SchemeField<A, E> = A extends undefined ? E : (state: E, action: A) => E;

export class NormalizedSchemeWithoutAll<T, R = undefined> {
	constructor(
		public byId: SchemeField<R, { [id in SchemeID]: T }>
	) {}
}

export class NormalizedScheme<T, R = undefined> {
	constructor(
		public byId: SchemeField<R, { [id in SchemeID]: T }>,
		public all: SchemeField<R, SchemeID[]>
	) {}
}

export class NormalizedSchemeWithFetching<T, R = undefined> extends NormalizedScheme<T, R> {
	constructor(
		public byId: SchemeField<R, { [id in SchemeID]: T }>,
		public all: SchemeField<R, SchemeID[]>,
		public isLoading: SchemeField<R, boolean>
	) {
		super(byId, all);
	}
}

export interface NormalizedActiveEntity<T = SchemeID, R = undefined> {
	active: SchemeField<R, T>;
}
