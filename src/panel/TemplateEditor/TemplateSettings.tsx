import React from "react";
import { useTemplate } from "./context";

import {
    IconButton,
    Paper,
    Stack,
    Switch,
    Tooltip,
    Typography
} from "@mui/material";

import {
    Launch as LaunchIcon
} from "@mui/icons-material";

import {
    inspectedWindow,
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
        <Paper
            elevation={3}
            sx={{
                width: 1,
                height: 300,
                m: 1,
                p: 1
            }}
        >
            <PropertyGrid items={[
                [
                    <Tooltip title="An optional default URL for the template. Can be a plain string or a formula. A formula is a Javascript expression enclosed in curly braces that returns a string. The formula can reference `params` to build a dynamic URL. Example: ```{`https://${origin}/${params.sku}`}```">
                        <Typography>url</Typography>
                    </Tooltip>,
                    <Stack direction="row">
                        <ValidateField
                            variant="standard"
                            size="small"
                            placeholder=""
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
                                    inspectedWindow.navigate(url);
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
                    <Tooltip title="Determines whether to use incognito mode.">
                        <Typography>incognito</Typography>
                    </Tooltip>,
                    <Switch
                        size="small"
                        checked={template.obj.incognito ?? true}
                        onChange={(event, value) => {
                            template.obj.incognito = value;
                            setTemplate(template.json());
                        }}
                    />
                ],
                [
                    <Tooltip title="Determines whether to use stealth mode.">
                        <Typography>stealth</Typography>
                    </Tooltip>,
                    <Switch
                        size="small"
                        checked={template.obj.stealth ?? false}
                        onChange={(event, value) => {
                            template.obj.stealth = value;
                            setTemplate(template.json());
                        }}
                    />
                ],
                [
                    <Tooltip title="Determines when to consider the initial page navigation to be complete.">
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