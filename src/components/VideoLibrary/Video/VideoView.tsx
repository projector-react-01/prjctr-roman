import React from "react";

export interface VideoViewProps {
    data: string[]
}

export const VideoView = (videoViewModel: VideoViewProps) => {
    const { data } = videoViewModel
    return (
        <div>
            Video Search State: {Object.values(data).join(', ')}
        </div>
    );
};
