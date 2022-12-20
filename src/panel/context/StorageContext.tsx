import { useEffect, useState } from "react";
import { cloudFetchTemplateDirectory } from "../../lib";

export function useStorage() {
    const [files, setFiles] = useState<string[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const files = await cloudFetchTemplateDirectory();
                setFiles(files.map(file => file.name));
                setError("");
            }
            catch (err) {
                debugger;
                setError(err instanceof Error ? err.message : JSON.stringify(err));
            }
        })();
    }, []);

    return {
        files,
        setFiles,
        error,
        setError
    };
}