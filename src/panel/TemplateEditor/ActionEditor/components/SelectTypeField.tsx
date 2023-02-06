import React, { useMemo } from "react";

import {
    Stack,
    SxProps,
    Theme,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip
} from "@mui/material";

import { TemplateItem } from "../lib";
import ActionIcon from "../../ActionIcon";
import SelectTypeDropdown from "./SelectTypeDropdown";
import * as syphonx from "syphonx-lib";

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
        if (value === "select") {
            obj.select = [{}];
            obj.pivot = undefined;
            obj.union = undefined;
        }
        else if (value === "pivot") {
            obj.select = undefined;
            obj.pivot = {};
            obj.union = undefined;
        }
        else if (value === "union") {
            obj.select = undefined;
            obj.pivot = undefined;
            obj.union = [{}];
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
                        <ActionIcon name="select" fontSize="small" />
                    </ToggleButton>
                    <ToggleButton value="pivot">
                        <ActionIcon name="pivot" fontSize="small" />
                    </ToggleButton>
                    <ToggleButton value="union">
                        <ActionIcon name="union" fontSize="small" />
                    </ToggleButton>
                </ToggleButtonGroup>
            )}
        </Stack>
    );
}