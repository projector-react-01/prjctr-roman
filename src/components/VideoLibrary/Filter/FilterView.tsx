import React from 'react';
import { useUIList } from "../../../contexts/lists";

import { FilterSelector } from "../FilterSelector";

type FilterViewProps = {
    category: string
    direction: string
    format: string
    level: string

    onCategoryChange: (payload: string) => void,
    onDirectionChange: (payload: string) => void,
    onFormatChange: (payload: string) => void,
    onLevelChange: (payload: string) => void
}

export const FilterView = (filterViewModel: FilterViewProps) => {
    const { categories, directions, formats, levels } = useUIList()

    const {
        category,
        direction,
        format,
        level,
        onCategoryChange,
        onDirectionChange,
        onFormatChange,
        onLevelChange
    } = filterViewModel

    return (
        <div>
            <FilterSelector
                selectorValue={category}
                selectorList={categories}
                onInput={onCategoryChange}
            />
            <FilterSelector
                selectorValue={direction}
                selectorList={directions}
                onInput={onDirectionChange}
            />
            <FilterSelector
                selectorValue={format}
                selectorList={formats}
                onInput={onFormatChange}
            />
            <FilterSelector
                selectorValue={level}
                selectorList={levels}
                onInput={onLevelChange}
            />
        </div>
    );
};

