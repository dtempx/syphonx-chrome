import React, { useMemo } from "react";
import { TemplateItem } from "../lib";
import * as syphonx from "syphonx-lib";

import {
    Switch,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip
} from "@mui/material";

import {
    FindInPageOutlined as QueryIcon,
    HighlightAlt as SelectIcon
} from "@mui/icons-material";

import {
    ComplexPropertyGrid,
    FormulaField,
    QueryEditorField,
    NumberField,
    RegexpField,
    SelectOnDropdown
} from "./components";

export interface Props {
    item: TemplateItem;
    onChange: (event: React.SyntheticEvent<Element, Event>) => void;
}

export default ({ item, onChange }: Props) => {

    const mode = useMemo(() => {
        const obj = item?.obj as syphonx.WaitFor;
        if (obj.query)
            return "query";
        else if (obj.select)
            return "select";
        else
            return undefined;
    }, [item]);

    function handleChangeMode(event: React.MouseEvent<HTMLElement, MouseEvent>, value: any): void {
        const obj = item?.obj as syphonx.WaitFor;
        if (value === "query") {
            obj.query = [[""]];
            obj.select = undefined;
            onChange(event);
        }
        else if (value === "select") {
            obj.select = [{ name: "value1" }];
            obj.query = undefined;
            onChange(event);
        }
    }

    const obj = item?.obj as syphonx.WaitFor;
    return obj ? (
        <ComplexPropertyGrid
            items={[
                [
                    "mode",
                    <ToggleButtonGroup
                        value={mode}
                        size="small"
                        exclusive
                        onChange={handleChangeMode}
                        sx={{ ml: 1 }}
                    >
                        <ToggleButton value="query">
                            <Tooltip title="query mode">
                                <QueryIcon fontSize="small" />
                            </Tooltip>
                        </ToggleButton>
                        <ToggleButton value="select">
                            <Tooltip title="select mode">
                                <SelectIcon fontSize="small" />
                            </Tooltip>
                        </ToggleButton>
                    </ToggleButtonGroup>,
                    "Choose query or select mode",
                    true,
                    mode === undefined ? "query or select required" : ""
                ],
                [
                    "query",
                    <QueryEditorField
                        name="waitfor"
                        query={obj.query}
                        onChange={(event, value) => {
                            obj.query = value;
                            onChange(event);
                        }}
                    />,
                    "A CSS selector or jQuery expression that determines the content to wait for on the page.",
                    mode === "query",
                    (!obj.query || JSON.stringify(obj.query) === `[[""]]`) && !obj.select ? "query or select required" : ""
                ],
                [
                    "on",
                    <SelectOnDropdown
                        value={obj.on}
                        onChange={(event, value) => {
                            obj.on = value;
                            onChange(event);
                        }}
                    />,
                    "Determines whether to wait for any, all, or none of the sub-selectors.",
                    mode === "select"
                ],
                [
                    "required",
                    <Switch
                        checked={obj.required ?? false}
                        onChange={(event, value) => {
                            obj.required = value;
                            onChange(event);
                        }}
                    />,
                    "Determines whether the click is optional or required, producing if no click target is found on the page.",
                    obj.required !== undefined
                ],
                [
                    "pattern",
                    <RegexpField
                        value={obj.pattern}
                        onChange={(event, value) => {
                            obj.pattern = value;
                            onChange(event);
                        }}
                    />,
                    "Waits for a specific text pattern if specified.",
                    obj.pattern !== undefined
                ],
                [
                    "timeout",
                    <NumberField
                        value={obj.timeout}
                        onChange={(event, value) => {
                            obj.timeout = value;
                            onChange(event);
                        }}
                    />,
                    "Number of seconds to wait before timing out.",
                    obj.timeout !== undefined
                ],
                [
                    "when",
                    <FormulaField
                        value={obj.when}
                        onChange={(event, value) => {
                            obj.when = value || undefined;
                            onChange(event);
                        }}
                    />,
                    "A formula that determines whether the click is evaluated or bypassed.",
                    obj.when !== undefined
                ],
                /*
                [
                    "active",
                    <Switch
                        checked={obj.active ?? true}
                        onChange={(event, value) => {
                            obj.active = value;
                            onChange(event);
                        }}
                    />,
                    "Determines whether the property is active or bypassed.",
                    obj.active !== undefined
                ]
                */
            ]}
        />
    ) : null;
};