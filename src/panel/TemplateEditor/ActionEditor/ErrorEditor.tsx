import React from "react";
import { TemplateItem } from "../lib";
import * as syphonx from "syphonx-lib";

import {
    Switch,
    TextField
} from "@mui/material";

import {
    AdvancedPropertyGrid,
    FormulaField,
    QueryEditorField,
    NumberField,
    NameField,
    VariantField
} from "./components";

export interface Props {
    item: TemplateItem;
    onChange: (event: React.SyntheticEvent<Element, Event>) => void;
}

export default ({ item, onChange }: Props) => {
    const obj = item?.obj as syphonx.Error;
    return obj ? (
        <AdvancedPropertyGrid
            items={[
                [
                    "name",
                    <TextField
                        variant="standard"
                        size="small"
                        placeholder="Name for this action"
                        inputProps={{ maxLength: 32 }}    
                        value={obj.name}
                        onChange={event => {
                            obj.name = event.target.value || undefined;
                            onChange(event);
                        }}
                    />,
                    "An optional descriptive name briefly summarizing the purpose of the error action. Name appears in the action tree and status output, enhances readibility of the template if specified.",
                    true
                ],
                [
                    "code",
                    <NameField
                        validation="kebab-case"
                        value={obj.code}
                        onChange={(event, value) => {
                            obj.code = value as syphonx.ExtractErrorCode;
                            onChange(event);
                        }}
                    />,
                    "Defines an error-code for programatically identifying the error.",
                    obj.code !== undefined
                ],
                [
                    "message",
                    <VariantField
                        variants={["string", "string-formula"]}
                        value={obj.message}
                        fullWidth
                        onChange={(event, value) => {
                            obj.message = value || "";
                            onChange(event);
                        }}
                    />,
                    "A human readable error message.",
                    true,
                    !obj.message ? "Specify a human readable message for the error." : ""
                ],
                [
                    "level",
                    <NumberField
                        fullWidth
                        value={obj.level}
                        onChange={(event, value) => {
                            obj.level = value;
                            onChange(event);
                        }}
                        min={0}
                    />,
                    "Defines an error-level number indicating the severity of the error. By convention, a zero indicates an error that will not succeed with a retry. (default=1)",
                    obj.level !== undefined
                ],
                [
                    "negate",
                    <Switch
                        size="small"
                        checked={obj.negate ?? false}
                        onChange={(event, value) => {
                            obj.negate = value;
                            onChange(event);
                        }}
                    />,
                    "Negates a boolean query result, inverting a false result to true and vice-versa.",
                    obj.negate !== undefined
                ],
                [
                    "query",
                    <QueryEditorField
                        name="error"
                        query={obj.query}
                        onChange={(event, value) => {
                            obj.query = value && value.length > 0 ? value : undefined;
                            onChange(event);
                        }}
                    />,
                    "A CSS selector or jQuery expression that determines whether an error is raised. If specified, an error is raised if the query produces a negative result (i.e. if something IS NOT there). To raise an error on a positive result (i.e. if something IS there), simply flip the negate switch. An error is raised unconditionally if not specified.",
                    true
                ],
                [
                    "stop",
                    <Switch
                        size="small"
                        checked={obj.stop ?? false}
                        onChange={(event, value) => {
                            obj.stop = value;
                            onChange(event);
                        }}
                    />,
                    "Determines whether the error should stop any further processing of the template.",
                    obj.stop !== undefined
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
                    "A formula returning a true or false result that determines whether the error is triggered or bypassed.",
                    obj.when !== undefined
                ]
            ]}
        />
    ) : null;
};