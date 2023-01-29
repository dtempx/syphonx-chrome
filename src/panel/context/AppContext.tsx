import React, { useEffect, useState } from "react";

export type AppMode = "visual-editor" | "code-editor" | "test-runner" | "template-settings";

export interface AppState {
    mode: AppMode;
    setMode: React.Dispatch<React.SetStateAction<AppMode>>;
    advanced: boolean;
    setAdvanced: React.Dispatch<React.SetStateAction<boolean>>;
    debug: boolean;
    setDebug: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useApp() {
    return React.useContext(AppContext);
}

export function AppProvider({ children }: { children: JSX.Element }) {
    const [mode, setMode] = useState<AppMode>("visual-editor");
    const [advanced, setAdvanced] = useState(false);
    const [debug, setDebug] = useState(false);

    useEffect(() => {
        chrome.storage.local.get(
            ["advanced", "debug"],
            ({ advanced, debug }) => {
                setAdvanced(!!advanced);
                setDebug(!!debug); 
            }
        );
    }, []);

    useEffect(() => {
        chrome.storage.local.set({ advanced, debug });
    }, [advanced, debug]);

    const value = {
        mode,
        setMode,
        advanced,
        setAdvanced,
        debug,
        setDebug
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

const AppContext = React.createContext<AppState>({} as AppState);