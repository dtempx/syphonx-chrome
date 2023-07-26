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
    Stack,
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
        autoOpen,
        setAutoOpen,
        debug,
        setDebug,
        email,
        serviceUrl,
        setServiceUrl,
        user
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
                            <Stack direction="row" spacing={email ? 2 : 0}>
                                <Typography>{email}</Typography>
                            </Stack>,
                            "",
                            true
                        ],
                        [
                            <Tooltip title="A system generated access token used to grant access.">
                                <Typography>Access Token</Typography>
                            </Tooltip>,
                            <Typography>{user?.id}</Typography>,
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