import React, { useEffect, useState } from "react";
import { FileDialog } from "../components";
import { cloud, Template } from "../../../lib";
import { useTemplate } from "../../context";
import * as background from "../../../background-proxy";

export interface Props {
    open: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent | {}) => void
}

export default ({ open, onClose }: Props) => {
    const [files, setFiles] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [opening, setOpening] = useState(false);
    const { setTemplate } = useTemplate();

    useEffect(() => {
        if (open) {
            (async () => {
                try {
                    setLoading(true);
                    const directory = await cloud.directory();
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

    async function onSelectFile(event: React.SyntheticEvent, file: string) {
        try {
            setOpening(true);
            const json = await cloud.read(file);
            const template = new Template(json, file);
            setTemplate(template.toString());
            onClose(event);
            setOpening(false);
            setError("");
            if (template.obj.url)
                background.navigate(template.obj.url);
        }
        catch (err) {
            debugger;
            setError(err instanceof Error ? err.message : JSON.stringify(err));
            setOpening(false);
        }
    }

    return (
        <FileDialog
            files={files}
            title="Open Template"
            mode="open"
            error={error}
            open={open}
            loading={loading}
            opening={opening}
            onSelectFile={onSelectFile}
            onClearError={() => setError("")}
            onClose={onClose}
        />
    );
};