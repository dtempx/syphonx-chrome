import React, { useEffect, useState } from "react";
import { FileDialog } from "./components";
import { inspectedWindow, sleep } from "./lib";
import { loadTemplateDirectory, openTemplate } from "../lib/cloud";
import { useApp, useTemplate } from "./context";

export interface Props {
    open: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent | {}) => void
}

export default ({ open, onClose }: Props) => {
    const { autoOpen, currentDirectory, setCurrentDirectory, serviceUrl, updateRecentFiles } = useApp();
    const { setTemplateFile, setTemplate, setContract, resetExtractStatus, user } = useTemplate();
    const [files, setFiles] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [opening, setOpening] = useState(false);

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

    async function onSelectFile(event: React.SyntheticEvent, file: string): Promise<boolean> {
        try {
            setOpening(true);
            resetExtractStatus();
            const { template, contract } = await openTemplate(file, { user, serviceUrl });
            if (autoOpen) {
                const url = await template.expandUrl();
                if (url) {
                    inspectedWindow.navigate(url);
                    await sleep(1000); // give some time for page to navigate before setting template    
                }
            }

            setTemplate(template.json());
            setTemplateFile(file);
            setContract(contract || "");
            updateRecentFiles(file);

            //TODO: consider
            //const { contract, error } = tryParseContract(contractJson) as Schema | undefined;
            //setContract(contract);
            //setError(error);

            //const dirname = path.dirname(file);
            //const contractFile = path.resolve(dirname, "contract.json");
            //const contractExists = files.some(file => file === contractFile);
            //setContractFile(contractExists ? contractFile : "");

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
            currentDirectory={currentDirectory}
            onCurrentDirectoryChange={setCurrentDirectory}
            onSelectFile={onSelectFile}
            onClearError={() => setError("")}
            onClose={onClose}
        />
    );
};