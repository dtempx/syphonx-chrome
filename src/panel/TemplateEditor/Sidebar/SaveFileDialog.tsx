import React, { useEffect, useMemo, useState } from "react";
import { SyphonXApi } from "syphonx-lib";
import { FileDialog } from "./components";
import { useApp, useTemplate } from "./context";
import { Template } from "./lib";
import { validateSession } from "../lib/cloud";

export interface Props {
    open: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent | {}) => void
}

export default ({ open, onClose }: Props) => {
    const { serviceUrl } = useApp();
    const { template: json, templateFile, setTemplateFile, user } = useTemplate();

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
                    const token = validateSession(user) ? `u/${user?.id}` : undefined;
                    const api = new SyphonXApi(token, serviceUrl, user?.email);
                    const directory = await api.directory();
                    const files = directory
                        .filter(file => file.name?.endsWith(".json") || file.type !== "file") // only .json files for now
                        .map(file => file.name);
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
            const json = template.file();
            const token = validateSession(user) ? `u/${user?.id}` : undefined;
            const api = new SyphonXApi(token, serviceUrl, user?.email);
            await api.write(file, JSON.stringify({ ...JSON.parse(json), email: user?.email }));
            setTemplateFile(file);
            setSaving(false);
            setError("");
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
            onSelectFile={handleSelectFile}
            onClearError={() => setError("")}
            onClose={onClose}
        />
    );
};