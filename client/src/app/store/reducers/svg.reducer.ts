import { Actions as SvgActions } from "../actions/svg/svg.actions";
import { SvgActionConstants } from "../actions/svg/svg.actions-type";
import { SvgFile } from "@app/models/svg.model";

export interface SvgFilesState {
	svgs : SvgFile[]
}

export const initialSvgState : SvgFilesState = {
	svgs : []
};

export const saveSvgReducer = (
	state = initialSvgState,
	action: SvgActions
) => {
	switch (action.type) {
		case SvgActionConstants.SAVE_SVG:
		
			return {
				...state,
        		svgs: state.svgs.concat(action.payload.svg)
			};
		default:
			return state;
	}
};