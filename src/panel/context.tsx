import React, { useEffect, useState } from "react";

export type AppMode = "visual-editor" | "code-editor" | "test-runner" | "template-settings";

export interface AppState {
    advanced: boolean;
    setAdvanced: React.Dispatch<React.SetStateAction<boolean>>;
    autoOpen: boolean;
    setAutoOpen: React.Dispatch<React.SetStateAction<boolean>>;
    autoRefresh: boolean;
    setAutoRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    debug: boolean;
    setDebug: React.Dispatch<React.SetStateAction<boolean>>;
    mode: AppMode;
    setMode: React.Dispatch<React.SetStateAction<AppMode>>;
}

export function useApp() {
    return React.useContext(AppContext);
}

export function AppProvider({ children }: { children: JSX.Element }) {
    const [advanced, setAdvanced] = useState(false);
    const [autoOpen, setAutoOpen] = useState(true);
    const [autoRefresh, setAutoRefresh] = useState(true);
    const [debug, setDebug] = useState(false);
    const [mode, setMode] = useState<AppMode>("visual-editor");

    useEffect(() => {
        chrome.storage.local.get(
            [
                "advanced",
                "autoOpen",
                "autoRefresh",
                "debug"
            ],
            ({
                advanced,
                autoOpen,
                autoRefresh,
                debug
            }) => {
                if (advanced !== undefined)
                    setAdvanced(advanced);
                if (autoOpen !== undefined)
                    setAutoOpen(autoOpen);
                if (autoRefresh !== undefined)
                    setAutoRefresh(autoRefresh);
                if (debug !== undefined)
                    setDebug(debug);
            }
        );
    }, []);

    useEffect(() => {
        chrome.storage.local.set({
            advanced,
            autoOpen,
            autoRefresh,
            debug
        });
    }, [
        advanced,
        autoOpen,
        autoRefresh,
        debug
    ]);

    const value = {
        advanced,
        setAdvanced,
        autoOpen,
        setAutoOpen,
        autoRefresh,
        setAutoRefresh,
        debug,
        setDebug,
        mode,
        setMode
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

const AppContext = React.createContext<AppState>({} as AppState);