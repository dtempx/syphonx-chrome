import React from "react";
import { FileDialog } from "../../../components";
import { cloudReadTemplateFile, Template } from "../../../lib";
import { useStorage, useTemplate } from "../../context";

export interface Props {
    open: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent | {}) => void
}

export default ({ open, onClose }: Props) => {
    const { files, error, setError } = useStorage();
    const { setTemplate } = useTemplate();

    async function onSelectFile(event: React.SyntheticEvent, file: string) {
        try {
            const obj = await cloudReadTemplateFile(file);
            const template = new Template(obj, file);
            setTemplate(template.toString());
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
            title="Open File"
            mode="open"
            error={error}
            open={open}
            onSelectFile={onSelectFile}
            onClearError={() => setError("")}
            onClose={onClose}
        />
    );
};