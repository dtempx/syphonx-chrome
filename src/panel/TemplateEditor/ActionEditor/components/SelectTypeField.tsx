import React, { useMemo } from "react";
import { TemplateItem } from "./lib";
import SelectTypeDropdown from "./SelectTypeDropdown";
import * as syphonx from "syphonx-lib";

import {
    Button,
    ButtonGroup,
    Stack,
    SxProps,
    Theme,
    Tooltip
} from "@mui/material";

export interface Props {
    item: TemplateItem;
    onChange: (event: React.SyntheticEvent<Element, Event>) => void;
    sx?: SxProps<Theme>;
}

export default ({ item, onChange, sx }: Props) => {

    const { type, mode } = useMemo(() => {
        const obj = item?.obj as syphonx.Select;
        const type = obj.type;
        let mode;
        if (obj.select)
            mode = "select";
        else if (obj.pivot)
            mode = "pivot";
        else if (obj.union)
            mode = "union";
        else
            mode = undefined;
        return { type, mode };
    }, [item]);

    function handleChangeType(event: React.SyntheticEvent<Element, Event>, value: syphonx.SelectType | undefined) {
        const obj = item?.obj as syphonx.Select;
        obj.type = value;
        obj.select = undefined;
        obj.pivot = undefined;
        obj.union = undefined;
        onChange(event);
    }

    function handleChangeMode(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: string): void {
        const obj = item?.obj as syphonx.Select;
        const subitem = (obj.select||[])[0] || obj.pivot || (obj.union||[])[0] || {};
        if (value === "select") {
            obj.select = [subitem];
            obj.pivot = undefined;
            obj.union = undefined;
        }
        else if (value === "pivot") {
            obj.select = undefined;
            obj.pivot = subitem;
            obj.union = undefined;
        }
        else if (value === "union") {
            obj.select = undefined;
            obj.pivot = undefined;
            obj.union = [subitem];
        }
        onChange(event);
    }

    return (
        <Stack direction="row" sx={sx}>
            <SelectTypeDropdown
                value={type}
                onChange={handleChangeType}
            />
            {type === "object" && (
                <ButtonGroup size="small" sx={{ ml: 1 }}>
                    <Tooltip title="Create a group of sub-selectors that are nested under this selector. Choose this option when dealing with information that's organized very consistently, or if you're uncertain which option to choose.">
                        <Button variant={mode === "select" ? "contained" : "outlined"} onClick={event => handleChangeMode(event, "select")} sx={{ fontSize: "x-small" }}>SUB-SELECT</Button>
                    </Tooltip>
                    {/*
                    <Tooltip title="Create a selector that pivots off of this selector.">
                        <Button variant={mode === "pivot" ? "contained" : "outlined"} onClick={event => handleChangeMode(event, "pivot")} sx={{ fontSize: "x-small" }}>PIVOT</Button>
                    </Tooltip>
                    */}
                    <Tooltip title="Create multiple variants of sub-selector groups that are nested under this selector. Choose this option when dealing with information that's organized multiple different ways.">
                        <Button variant={mode === "union" ? "contained" : "outlined"} onClick={event => handleChangeMode(event, "union")} sx={{ fontSize: "x-small" }}>UNION</Button>
                    </Tooltip>
                </ButtonGroup>
            )}
        </Stack>
    );
}