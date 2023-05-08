import React from "react";
import { useApp } from "../context";
import { regexp } from "../lib";

import {
    AdvancedPropertyGrid,
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
        autoScroll,
        setAutoScroll,
        autoOpen,
        setAutoOpen,
        debug,
        setDebug,
        email,
        setEmail,
        serviceUrl,
        setServiceUrl
    } = useApp();

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
                <AdvancedPropertyGrid
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
                            />,
                            "",
                            true
                        ],
                        [
                            <Tooltip title="A system generated API key used to grant access.">
                                <Typography>API Key</Typography>
                            </Tooltip>,
                            <ValidateField
                                variant="standard"
                                size="small"
                                fullWidth
                                value={apiKey}
                                onChange={(event, value) => setApiKey(value)}
                                onValidate={(event, value) => value ? regexp.apiKey.test(value) : true}
                            />,
                            "",
                            true
                        ],
                        [
                            <Tooltip title="Automatically open the template default URL if enabled.">
                                <Typography>Auto-open template default URL</Typography>
                            </Tooltip>,
                            <Switch
                                size="small"
                                checked={autoOpen}
                                onChange={() => setAutoOpen(!autoOpen)}
                            />,
                            "",
                            true
                        ],
                        [
                            <Tooltip title="Automatically scroll the target element into view on the page when hovering over the tree view.">
                                <Typography>Auto-scroll target into view</Typography>
                            </Tooltip>,
                            <Switch
                                size="small"
                                checked={autoScroll}
                                onChange={() => setAutoScroll(!autoScroll)}
                            />,
                            "",
                            true
                        ],
                        [
                            <Tooltip title="Show or hide advanced settings.">
                                <Typography>Advanced mode</Typography>
                            </Tooltip>,
                            <Switch
                                size="small"
                                checked={advanced}
                                onChange={() => setAdvanced(!advanced)}
                            />,
                            "",
                            true
                        ],
                        [
                            <Tooltip title="Show or hide additional developer info.">
                                <Typography>Developer mode</Typography>
                            </Tooltip>,
                            <Switch
                                size="small"
                                checked={debug}
                                onChange={() => setDebug(!debug)}
                            />,
                            "",
                            true
                        ],
                        [
                            <Tooltip title="Override the cloud service URL for development and testing purposes.">
                                <Typography>Cloud Service URL</Typography>
                            </Tooltip>,
                            <ValidateField
                                variant="standard"
                                size="small"
                                fullWidth
                                placeholder="http://localhost:8080"
                                value={serviceUrl}
                                onChange={(event, value) => setServiceUrl(value)}
                                onValidate={(event, value) => value ? regexp.url.test(value) : true}
                            />,
                            "",
                            debug || !!serviceUrl
                        ]
                    ]}
                />
            </DialogContent>

            <DialogActions>
            </DialogActions>
        </Dialog>
    );
};