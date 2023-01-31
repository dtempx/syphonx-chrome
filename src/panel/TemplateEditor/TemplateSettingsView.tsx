import React from "react";
import { IconButton, Paper, Stack, Tooltip } from "@mui/material";
import { Launch as LaunchIcon } from "@mui/icons-material";
import { useTemplate } from "./context";
import { background, Template } from "./lib";

import {
    PropertyGrid,
    PropertyGridItem,
    ValidateField
} from "./components";

export default () => {
    const { template: json, setTemplate } = useTemplate();
    const template = new Template(json);

    function onChangeUrl(event: React.SyntheticEvent<Element, Event>, value: string) {
        template.obj.url = value || undefined;
        setTemplate(template.toString());
    }

    function onValidateUrl(event: React.ChangeEvent<HTMLInputElement>, value: string): boolean {
        return value ? /^https?:\/\/[^\/]/.test(value) : true;
    }

    function onChangeKey(event: React.SyntheticEvent<Element, Event>, value: string) {
        template.obj.key = value || undefined;
        setTemplate(template.toString());
    }

    function onValidateKey(event: React.ChangeEvent<HTMLInputElement>, value: string): boolean {
        return value ? /^\/([a-z0-9-]+\/)*[a-z0-9-]+$/.test(value) : true;
    }

    const items: PropertyGridItem[] = [
        [
            "url",
            <Stack direction="row">
                <ValidateField
                    variant="standard"
                    size="small"
                    fullWidth
                    value={template.obj.url}
                    onChange={onChangeUrl}
                    onValidate={onValidateUrl}
                />
                <IconButton
                    onClick={() => background.navigate(template.obj.url!)}
                    sx={{ visibility: template.obj.url ? "visible" : "hidden" }}
                >
                    <Tooltip title="Navigate to the url">
                        <LaunchIcon fontSize="small" />
                    </Tooltip>
                </IconButton>
            </Stack>,
            "A default URL for the template."
        ],
        [
            "key",
            <ValidateField
                variant="standard"
                size="small"
                fullWidth
                value={template.obj.key}
                onChange={onChangeKey}
                onValidate={onValidateKey}
            />,
            "A key that uniquely identifies this template. Typically used by the host crawling environment to identify context for the data."
        ]
    ];

    return (
        <Paper elevation={3} className="panel" sx={{ width: 1, height: 300 }}>
            <PropertyGrid items={items} />
        </Paper>
    );
};