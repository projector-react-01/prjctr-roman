import React, { useEffect } from "react";

import { Filter } from "../Filter";
import { Video } from "../Video";

interface LibraryViewProps {
    filter: () => void
    dispose: () => void
}

export const LibraryWrapper = (libraryViewModel: LibraryViewProps) => {

    useEffect(() => {
        libraryViewModel.filter()

        return () => {
            libraryViewModel.dispose()
        }
    }, [])

    return (
        <>
            <Filter />
            <Video />
        </>
    );
};

