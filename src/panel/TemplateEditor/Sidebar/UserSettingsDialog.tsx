import React from "react";
import { useApp, useTemplate } from "../context";
import { regexp } from "../lib";

import {
    PropertyGrid,
    TitleBar,
    TransitionUp,
    ValidateField
} from "../components";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Switch,
    Tooltip,
    Typography
} from "@mui/material";

export interface Props {
    open: boolean;
    onClose: (event: React.SyntheticEvent) => void;
}

export default ({ open, onClose }: Props) => {
    const {
        advanced,
        setAdvanced,
        apiKey,
        setApiKey,
        autoOpen,
        setAutoOpen,
        debug,
        setDebug,
        email,
        setEmail
    } = useApp();

    const {
        serviceUrl,
        setServiceUrl
    } = useTemplate();

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={TransitionUp}
        >
            <DialogTitle sx={{ p: 0 }}>
                <TitleBar title="User Settings" onClose={onClose} />
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
                <PropertyGrid
                    columns={[{ width: 400 }]}
                    items={[
                        [
                            <Tooltip title="An email address used to identity your changes.">
                                <Typography>Email</Typography>
                            </Tooltip>,
                            <ValidateField
                                variant="standard"
                                size="small"
                                fullWidth
                                value={email}
                                onChange={(event, value) => setEmail(value)}
                                onValidate={(event, value) => value ? regexp.email.test(value) : true}
                                inputProps={{ maxLength: 64 }}
                            />
                        ],
                        [
                            <Tooltip title="A system generated API key used to grant access.">
                                <Typography>API Key</Typography>
                            </Tooltip>,
                            <ValidateField
                                variant="standard"
                                size="small"
                                value={apiKey}
                                onChange={(event, value) => setApiKey(value)}
                                onValidate={(event, value) => value ? regexp.apiKey.test(value) : true}
                                inputProps={{ maxLength: 20 }}
                            />
                        ],
                        [
                            <Tooltip title="Automatically opens the template default URL if enabled.">
                                <Typography>Auto-open template default URL</Typography>
                            </Tooltip>,
                            <Switch
                                size="small"
                                checked={autoOpen}
                                onChange={() => setAutoOpen(!autoOpen)}
                            />
                        ],
                        [
                            <Tooltip title="Shows or hides advanced settings.">
                                <Typography>Advanced mode</Typography>
                            </Tooltip>,
                            <Switch
                                size="small"
                                checked={advanced}
                                onChange={() => setAdvanced(!advanced)}
                            />
                        ],
                        [
                            <Tooltip title="Shows or hides additional debug info.">
                                <Typography>Debug mode</Typography>
                            </Tooltip>,
                            <Switch
                                size="small"
                                checked={debug}
                                onChange={() => setDebug(!debug)}
                            />
                        ],
                        [
                            <Tooltip title="Overrides the cloud service URL for development and testing purposes.">
                                <Typography>Cloud Service URL</Typography>
                            </Tooltip>,
                            <ValidateField
                                variant="standard"
                                size="small"
                                fullWidth
                                value={serviceUrl}
                                onChange={(event, value) => setServiceUrl(value)}
                                onValidate={(event, value) => value ? regexp.url.test(value) : true}
                            />
                        ]
                    ]}
                />
            </DialogContent>

            <DialogActions>
            </DialogActions>
        </Dialog>
    );
};