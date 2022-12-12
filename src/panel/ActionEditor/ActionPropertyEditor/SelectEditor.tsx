import React from "react";
import { Switch } from "@mui/material";
import * as syphonx from "syphonx-lib";
import { useTemplate, TemplateItem } from '../../TemplateContext/index';
import { EditField, PropertyGrid } from "../../../components/";
import SelectQueryEditor from "./SelectQueryEditor";
import SelectFormatDropDown from "./SelectFormatDropDown";
import SelectTypeDropDown from "./SelectTypeDropDown";

export interface Props {
    item: TemplateItem;
}

export default ({ item }: Props) => {
    const { updateTemplate } = useTemplate();
    const select = item.obj as syphonx.Select;

    function validateName(value: string): boolean {
        return /^[a-z][a-z0-9_]*$/.test(value);
    }

    function validateNumber(value: string): boolean {
        return value ? parseInt(value) >= 0 : true;
    }

    return (
        <PropertyGrid
            items={[
                [
                    "name",
                    <EditField
                        variant="standard"
                        size="small"
                        value={select.name}
                        onChange={(event, value) => { select.name = value; updateTemplate(); }}
                        onValidate={validateName}
                    />,
                    "Determines the name of the selected value"
                ],
                [
                    "query",
                    <SelectQueryEditor
                        query={select.query}
                        onChange={(event, value) => { select.query = value; updateTemplate(); }}
                    />,
                    "A CSS selector or jQuery expression that determines what data is selected"
                ],
                [
                    "type",
                    <SelectTypeDropDown
                        value={select.type}
                        onChange={(event, value) => { select.type = value; updateTemplate(); }}
                    />,
                    "Determines the type of the property value"
                ],
                [
                    "repeated",
                    <Switch
                        checked={select.repeated ?? false}
                        onChange={(event, value) => { select.repeated = value; updateTemplate(); }}
                    />,
                    "Indicates whether the data is single-valued or repeated within an array"
                ],
                [
                    "required",
                    <Switch
                        checked={select.required ?? false}
                        onChange={(event, value) => { select.required = value; updateTemplate(); }}
                    />,
                    "Determines whether the property is required which produces an error if a value is not obtained"
                ],
                [
                    "value",
                    <EditField
                        variant="standard"
                        size="small"
                        value={select.value}
                        onChange={(event, value) => { select.value = value || undefined; updateTemplate(); }}
                        onValidate={validateName}
                    />,
                    "A predetermined or computed value, used if a DOM query is not specified"
                ],
                [
                    "all",
                    <Switch
                        checked={select.all ?? false}
                        onChange={(event, value) => { select.all = value; updateTemplate(); }}
                    />,
                    "Determines whether to evaluate all query stages, or stop at the first stage that produces a value"
                ],
                [
                    "limit",
                    <EditField
                        variant="standard"
                        size="small"
                        value={select.limit}
                        onChange={(event, value) => { select.limit = value ? parseInt(value) : undefined; updateTemplate(); }}
                        onValidate={validateNumber}
                    />,
                    "Limits the number of nodes to be selected, unlimited if not specified"
                ],
                [
                    "format",
                    <SelectFormatDropDown
                        value={select.format}
                        onChange={(event, value) => { select.format = value; updateTemplate();  }}
                    />,
                    "Determines how the selected value is formatted"
                ],
                [
                    "pattern",
                    <EditField
                        variant="standard"
                        size="small"
                        value={select.pattern}
                        onChange={(event, value) => { select.pattern = value || undefined; updateTemplate(); }}
                        onValidate={validateName}
                    />,
                    "A regex pattern for validation, an error will be produced if the value does not match the pattern"
                ],
                [
                    "collate",
                    <Switch
                        checked={select.collate ?? false}
                        onChange={(event, value) => { select.collate = value; updateTemplate(); }}
                    />,
                    "Combines all selected nodes into a single value"
                ],
                [
                    "when",
                    <EditField
                        variant="standard"
                        size="small"
                        value={select.when}
                        onChange={(event, value) => { select.when = value || undefined; updateTemplate(); }}
                        onValidate={validateName}
                    />,
                    "Makes value selection conditional based whether the evaluation produces a true result"
                ],
                [
                    "active",
                    <Switch
                        checked={select.active ?? true}
                        onChange={(event, value) => { select.active = value; updateTemplate(); }}
                    />,
                    "Determines whether the property is active or ignored"
                ]
            ]}
        />
    );
};