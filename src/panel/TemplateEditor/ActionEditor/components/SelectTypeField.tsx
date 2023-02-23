import React, { useMemo } from "react";
import { TemplateItem } from "../lib";
import SelectTypeDropdown from "./SelectTypeDropdown";
import * as syphonx from "syphonx-lib";

import {
    Stack,
    SxProps,
    Theme,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip
} from "@mui/material";

import {
    HighlightAlt as SelectIcon,
    PivotTableChart as PivotIcon,
    Mediation as UnionIcon
} from "@mui/icons-material";

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

    function handleChangeMode(event: React.MouseEvent<HTMLElement, MouseEvent>, value: any): void {
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
                <ToggleButtonGroup
                    value={mode}
                    size="small"
                    exclusive
                    onChange={handleChangeMode}
                    sx={{ ml: 1 }}
                >
                    <ToggleButton value="select">
                        <Tooltip title="sub-select">
                            <SelectIcon fontSize="small" />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton value="pivot">
                        <Tooltip title="pivot">
                            <PivotIcon fontSize="small" />    
                        </Tooltip>                        
                    </ToggleButton>
                    <ToggleButton value="union">
                        <Tooltip title="union">
                            <UnionIcon fontSize="small" />                            
                        </Tooltip>
                    </ToggleButton>
                </ToggleButtonGroup>
            )}
        </Stack>
    );
}