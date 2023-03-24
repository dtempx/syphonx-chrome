import React from "react";
import { IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { Launch as LaunchIcon } from "@mui/icons-material";
import { useTemplate } from "./context";
import { background, regexp, Template } from "./lib";
import { PropertyGrid, ValidateField } from "./components";

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
                                return value ? regexp.url.test(value) : true;
                            }}
                        />
                        <IconButton
                            onClick={() => background.inspectedWindow.navigate(template.obj.url!)}
                            sx={{ visibility: template.obj.url ? "visible" : "hidden" }}
                        >
                            <Tooltip title="Navigate to the url">
                                <LaunchIcon fontSize="small" />
                            </Tooltip>
                        </IconButton>
                    </Stack>
                ],
                [
                    <Tooltip title="A key that uniquely identifies this template. Typically used by the host crawling environment to identify context for the data.">
                        <Typography>key</Typography>
                    </Tooltip>,
                    <ValidateField
                        variant="standard"
                        size="small"
                        fullWidth
                        value={template.obj.key}
                        onChange={(event, value) => {
                            template.obj.key = value || undefined;
                            setTemplate(template.json());            
                        }}
                        onValidate={(event, value) => {
                            return value ? /^\/([a-z0-9-]+\/)*[a-z0-9-]+$/.test(value) : true;
                        }}
                    />
                ]
            ]} />
        </Paper>
    );
};