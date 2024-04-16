import React, { useMemo, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useApp, useTemplate } from "./context";
import { AlertBar, TemplateChip } from "./components";
import { cloud, Template } from "./lib";
import * as syphonx from "syphonx-lib";

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";

interface Props {
    open: boolean;
    onClose: (event: {}) => void;
    onBrowse: (event: {}) => void;
}

export default ({ open, onClose, onBrowse }: Props) => {
    const { serviceUrl, updateRecentFiles } = useApp();
    const { template: json, templateFile, templateRevision, setTemplateFile, setTemplateRevision, extractState, user } = useTemplate();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const errors = (extractState?.errors || []) as syphonx.ExtractError[]; // WORKAROUND https://github.com/microsoft/TypeScript/issues/36981

    const template = useMemo(() => {
        return new Template(json);
    }, [json]);

    async function handleSave(event: {}) {
        try {
            setSaving(true);
            await cloud.saveTemplate(template, templateFile, { user, serviceUrl });
            setTemplateFile(templateFile);
            setTemplateRevision("");
            setSaving(false);
            setError("");
            updateRecentFiles(templateFile);
            onClose(event);
        }
        catch (err) {
            debugger;
            setError(err instanceof Error ? err.message : JSON.stringify(err));
            setSaving(false);
        }
    }

    return (
        <Dialog
            open={open}
            onClose={event => onClose(event)}
        >
            <DialogTitle color="primary">Save Template</DialogTitle>
            <DialogContent sx={{ width: 550, height: 200 }}>
                <TemplateChip />
                <AlertBar message={error} open={!!error} onClose={() => setError("")} />
                {templateRevision &&
                <Typography sx={{ mt: 1 }}>Rolling back to {templateRevision}</Typography>}
                <Typography color={errors.length === 0 ? "success" : "error"} sx={{ mt: 1 }}>{errors.length} errors</Typography>
            </DialogContent>
            <DialogActions>
                <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}>
                    <Button onClick={event => onBrowse(event)} disabled={saving}>Save As...</Button>
                </Box>
                <LoadingButton
                    onClick={handleSave}
                    loading={saving}
                    loadingPosition="end"
                    disabled={saving}
                    autoFocus
                    sx={{ width: 100 }}
                >
                    <Typography>Save</Typography>
                </LoadingButton>
                <Button onClick={event => onClose(event)} disabled={saving}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );    
};