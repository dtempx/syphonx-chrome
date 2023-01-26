import React, { useEffect, useMemo, useState } from "react";
import { FileDialog } from "../components";
import { cloudFetchTemplateDirectory, cloudUpdateTemplateFile } from "../../../lib";
import { useTemplate } from "../../context";
import { Template } from "../../../lib";

export interface Props {
    open: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent | {}) => void
}

export default ({ open, onClose }: Props) => {
    const [files, setFiles] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const { template: json } = useTemplate();

    const template = useMemo(() => {
        return new Template(json);
    }, [json]);

    useEffect(() => {
        if (open) {
            (async () => {
                try {
                    setLoading(true);
                    const directory = await cloudFetchTemplateDirectory();
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

    async function handleSelectFile(event: React.SyntheticEvent, file: string) {
        try {
            setSaving(true);
            const json = template.toString("file");
            await cloudUpdateTemplateFile(file, json);
            onClose(event);
            setSaving(false);
            setError("");
        }
        catch (err) {
            debugger;
            setError(err instanceof Error ? err.message : JSON.stringify(err));
            setSaving(false);
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
            selectedFile={template.file()}
            onSelectFile={handleSelectFile}
            onClearError={() => setError("")}
            onClose={onClose}
        />
    );
};