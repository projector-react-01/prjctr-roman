import { connect } from "../../HOC/Injector";
import { TYPES } from "../../../constants";

import { VideoView } from "./VideoView";

interface SearchResult {
    readonly data: string[]
    readonly totalCount: number
}

interface FilterResultState {
    readonly result: SearchResult;
}

interface FilterResultActions {
    readonly setResult: (result: SearchResult) => void
}

type FilterResultService = FilterResultState & FilterResultActions

export const createVideoViewModel = (filterResult: FilterResultService) => {
    return {
        result: filterResult.result
    }
}

export const Video = connect(VideoView, TYPES.videoViewModel)
