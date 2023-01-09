import React from "react";
import { FileDialog } from "../../../components";
import { cloudCreateTemplateFile } from "../../../lib";
import { useStorage, useTemplate } from "../../context";

export interface Props {
    open: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent | {}) => void
}

export default ({ open, onClose }: Props) => {
    const { files, error, setError } = useStorage();
    const { template } = useTemplate();

    async function handleSelectFile(event: React.SyntheticEvent, file: string) {
        const content = template.json();
        try {
            await cloudCreateTemplateFile(file, content);
            onClose(event);
        }
        catch (err) {
            debugger;
            setError(err instanceof Error ? err.message : JSON.stringify(err));
        }
    }

    return (
        <FileDialog
            files={files}
            title="Save File"
            mode="save"
            error={error}
            open={open}
            selectedFile={template.file}
            onSelectFile={handleSelectFile}
            onClearError={() => setError("")}
            onClose={onClose}
        />
    );
};