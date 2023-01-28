import React, { useState } from "react";

export type AppMode = "visual-editor" | "code-editor" | "test-runner" | "template-settings";

export interface AppState {
    mode: AppMode;
    setMode: React.Dispatch<React.SetStateAction<AppMode>>;
    advanced: boolean;
    setAdvanced: React.Dispatch<React.SetStateAction<boolean>>;
    debug: boolean;
    setDebug: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = React.createContext<AppState>({} as AppState);

export function useApp() {
    return React.useContext(AppContext);
}

export function AppProvider({ children }: { children: JSX.Element }) {
    const [mode, setMode] = useState<AppMode>("visual-editor");
    const [advanced, setAdvanced] = useState(false);
    const [debug, setDebug] = useState(false);

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