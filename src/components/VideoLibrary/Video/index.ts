import { observable } from "mobx";
import { ComposeFunction, connect } from "../../HOC/Injector";
import { TYPES } from "../../../constants";

import { VideoView, VideoViewProps } from "./VideoView";
import { useDependency } from "../../../hooks/useDependency";

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

type Props = {}

export function composeVideoViewModel(filterResult: FilterResultService): ComposeFunction<Props, VideoViewProps> {
    return () => {
        return {
            props: filterResult.result,
            actions: {}
        };
    };
}

const Video = connect<{}, SearchResult>(VideoView, () => useDependency(TYPES.videoViewModel))
export {
    Video
}
