import React from "react";

interface VideoViewProps {
    result: {
        data: string[]
        totalCount: number
    }
}

export const VideoView = (videoViewModel: VideoViewProps) => {
    const { result } = videoViewModel
    return (
        <div>
            Video Search State: {Object.values(result.data).join(', ')}
        </div>
    );
};
