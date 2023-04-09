import React, { useEffect, useState } from "react";
import { FileDialog } from "../components";
import { background, cloud, path, sleep, Template } from "../lib";
import { useApp, useTemplate } from "../context";

export interface Props {
    open: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent | {}) => void
}

export default ({ open, onClose }: Props) => {
    const { autoOpen } = useApp();
    const { setTemplateFile, setTemplate, setContractFile, setExtract } = useTemplate();

    const [files, setFiles] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [opening, setOpening] = useState(false);

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

    async function onSelectFile(event: React.SyntheticEvent, file: string): Promise<boolean> {
        try {
            setOpening(true);
            setExtract(undefined);
            const json = await cloud.read(file);
            const template = new Template(json);

            if (autoOpen) {
                const url = await template.expandUrl();
                if (url) {
                    background.inspectedWindow.navigate(url);
                    await sleep(1000); // give some time for page to navigate before setting template    
                }
            }

            setTemplate(template.json());
            setTemplateFile(file);

            const dirname = path.dirname(file);
            const contractFile = path.resolve(dirname, "contract.json");
            const contractExists = files.some(file => file === contractFile);
            setContractFile(contractExists ? contractFile : "");

            onClose(event);
            setOpening(false);
            setError("");
            return true;
        }
        catch (err) {
            debugger;
            setError(err instanceof Error ? err.message : JSON.stringify(err));
            setOpening(false);
            return false;
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