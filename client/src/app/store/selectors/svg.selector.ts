import { AppState } from "@app/models";

export const addedNewSvg = () => (state: AppState) =>
    state.svgfiles.svgs;