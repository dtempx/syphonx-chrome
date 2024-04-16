import React, { useEffect, useMemo, useState } from "react";
import { FileDialog } from "./components";
import { useApp, useTemplate } from "./context";
import { Template } from "./lib";
import { loadTemplateDirectory, saveTemplate } from "../lib/cloud";

export interface Props {
    open: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent | {}) => void
}

export default ({ open, onClose }: Props) => {
    const { currentDirectory, setCurrentDirectory, serviceUrl, updateRecentFiles } = useApp();
    const { template: json, templateFile, setTemplateFile, setTemplateRevision, user } = useTemplate();

    const [files, setFiles] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const template = useMemo(() => {
        return new Template(json);
    }, [json]);

    useEffect(() => {
        if (open) {
            (async () => {
                try {
                    setLoading(true);
                    const files = await loadTemplateDirectory({ user, serviceUrl });
                    setFiles(files);
                    setError("");
                    setLoading(false);
                }
                catch (err) {
                    debugger;
                    setError(err instanceof Error ? err.message : JSON.stringify(err));
                    setLoading(false);
                }
            })();
        }
    }, [open]);

    async function handleSelectFile(event: React.SyntheticEvent, file: string): Promise<boolean> {
        try {
            setSaving(true);
            await saveTemplate(template, file, { user, serviceUrl });
            setTemplateFile(file);
            setTemplateRevision("");
            setSaving(false);
            setError("");
            updateRecentFiles(file);
            onClose(event);
            return true;
        }
        catch (err) {
            debugger;
            setError(err instanceof Error ? err.message : JSON.stringify(err));
            setSaving(false);
            return false;
        }
    }

    return (
        <FileDialog
            files={files}
            title="Save Template"
            mode="save"
            error={error}
            open={open}
            loading={loading}
            saving={saving}
            selectedFile={templateFile}
            currentDirectory={currentDirectory}
            onCurrentDirectoryChange={setCurrentDirectory}
            onSelectFile={handleSelectFile}
            onClearError={() => setError("")}
            onClose={onClose}
        />
    );
};