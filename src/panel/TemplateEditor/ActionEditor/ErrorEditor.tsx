import React from "react";
import { Switch } from "@mui/material";
import { TemplateItem } from "../lib";
import * as syphonx from "syphonx-lib";

import {
    ComplexPropertyGrid,
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
        <ComplexPropertyGrid
            items={[
                [
                    "message",
                    <VariantField
                        variants={["string", "dynamic-string"]}
                        value={obj.message}
                        onChange={(event, value) => {
                            obj.message = value || "";
                            onChange(event);
                        }}
                    />,
                    "Defines the message for an error that is produced if triggered by when or query, or unconditionally if neither is specified.",
                    true,
                    !obj.message ? "message required" : ""
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
                    "level",
                    <NumberField
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
                    "query",
                    <QueryEditorField
                        name="error"
                        query={obj.query}
                        onChange={(event, value) => {
                            obj.query = value;
                            onChange(event);
                        }}
                    />,
                    "A CSS selector or jQuery expression that determines whether an error is produced. An error is produced unconditionally if not specified.",
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
                    "A formula returning a true or false result that determines whether an error is produced.",
                    obj.when !== undefined
                ],
                /*
                [
                    "active",
                    <Switch
                        size="small"
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