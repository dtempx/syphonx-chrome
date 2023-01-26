import React, { useMemo } from "react";
import { Switch } from "@mui/material";
import { useTemplate } from "../../context";
import { Template } from "../../../lib";
import * as syphonx from "syphonx-lib";

import {
    ComplexPropertyGrid,
    FormulaField,
    QueryEditorField,
    NumberField,
    SymbolicNameField,
    VariantField
} from "./components";

export default () => {
    const { template: json, setTemplate } = useTemplate();

    const { template, obj } = useMemo(() => {
        const template = new Template(json);
        const item = template.selected();
        const obj = item?.obj as syphonx.Error;
        return { template, obj };
    }, [json]);

    return obj ? (
        <ComplexPropertyGrid
            items={[
                [
                    "message",
                    <VariantField
                        variants={["string", "dynamic-string"]}
                        value={obj.message}
                        onChange={(event, value) => { obj.message = value || ""; setTemplate(template.toString()); }}
                    />,
                    "Defines the message for an error that is produced if triggered by when or query, or unconditionally if neither is specified.",
                    true
                ],
                [
                    "code",
                    <SymbolicNameField
                        variant="kebab-case"
                        value={obj.code}
                        onChange={(event, value) => { obj.code = value as syphonx.ExtractErrorCode; setTemplate(template.toString()); }}
                    />,
                    "Defines an error-code for programatically identifying the error.",
                    obj.code !== undefined
                ],
                [
                    "level",
                    <NumberField
                        value={obj.level}
                        onChange={(event, value) => { obj.level = value; setTemplate(template.toString()); }}
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
                        onChange={(event, value) => { obj.query = value; setTemplate(template.toString()); }}
                    />,
                    "A CSS selector or jQuery expression that determines whether an error is produced.",
                    true
                ],    
                [
                    "stop",
                    <Switch
                        checked={obj.stop ?? false}
                        onChange={(event, value) => { obj.stop = value; setTemplate(template.toString()); }}
                    />,
                    "Determines whether the error should stop any further processing of the template.",
                    obj.stop !== undefined
                ],
                [
                    "when",
                    <FormulaField
                        value={obj.when}
                        onChange={(event, value) => { obj.when = value || undefined; setTemplate(template.toString()); }}
                    />,
                    "A formula returning a true or false result that determines whether an error is produced.",
                    obj.when !== undefined
                ],
                [
                    "active",
                    <Switch
                        checked={obj.active ?? true}
                        onChange={(event, value) => { obj.active = value; setTemplate(template.toString()); }}
                    />,
                    "Determines whether the property is active or bypassed.",
                    obj.active !== undefined
                ]
            ]}
        />
    ) : null;
};