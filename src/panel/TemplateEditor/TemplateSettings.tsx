import React from "react";
import { useTemplate } from "./context";

import {
    IconButton,
    Paper,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";

import {
    Launch as LaunchIcon
} from "@mui/icons-material";

import {
    background,
    isFormula,
    regexp,
    validateFormula,
    Template
} from "./lib";

import {
    PropertyGrid,
    SwitchedObjectEditor,
    ValidateField,
    WaitUntilDropdown
} from "./components";

export default () => {
    const { template: json, setTemplate } = useTemplate();
    const template = new Template(json);
    return (
        <Paper elevation={3} className="panel" sx={{ width: 1, height: 300 }}>
            <PropertyGrid items={[
                [
                    <Tooltip title="A default URL for the template.">
                        <Typography>url</Typography>
                    </Tooltip>,
                    <Stack direction="row">
                        <ValidateField
                            variant="standard"
                            size="small"
                            fullWidth
                            value={template.obj.url}
                            onChange={(event, value) => {
                                template.obj.url = value || undefined;
                                setTemplate(template.json());                
                            }}
                            onValidate={(event, value) => {
                                if (!value)
                                    return true;
                                else if (isFormula(value))
                                    return validateFormula(value);
                                else
                                    return regexp.url.test(value);
                            }}
                        />
                        <IconButton
                            onClick={async () => {
                                const url = await template.expandUrl();
                                if (url)
                                    background.inspectedWindow.navigate(url);
                            }}
                            sx={{ visibility: template.obj.url ? "visible" : "hidden" }}
                        >
                            <Tooltip title="Navigate to the url">
                                <LaunchIcon fontSize="small" />
                            </Tooltip>
                        </IconButton>
                    </Stack>
                ],
                [
                    <Tooltip title="Template parameters that can be referenced from within a formula providing dynamic, data-driven control of template evaluation.">
                        <Typography>params</Typography>
                    </Tooltip>,
                    <SwitchedObjectEditor
                        obj={template.obj.params}
                        onChange={(event, obj) => {
                            template.obj.params = obj;
                            setTemplate(template.json());
                        }}
                    />
                ],
                [
                    <Tooltip title="Specify HTTP headers such as cookies or other request info needed to unblock access to a site.">
                        <Typography>headers</Typography>
                    </Tooltip>,
                    <SwitchedObjectEditor
                        obj={template.obj.headers}
                        onChange={(event, obj) => {
                            template.obj.headers = obj;
                            setTemplate(template.json());
                        }}
                    />
                ],
                [
                    <Tooltip title="When to consider the browser navigation to be complete.">
                        <Typography>waitUntil</Typography>
                    </Tooltip>,
                    <WaitUntilDropdown
                        value={template.obj.waitUntil}
                        onChange={(event, value) => {
                            template.obj.waitUntil = value;
                            setTemplate(template.json());
                        }}
                    />
                ]
            ]} />
        </Paper>
    );
};