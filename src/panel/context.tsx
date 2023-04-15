import React, { useEffect, useState } from "react";

export type AppMode = "visual-editor" | "code-editor" | "test-runner" | "template-settings";

export interface AppState {
    advanced: boolean;
    setAdvanced: React.Dispatch<React.SetStateAction<boolean>>;
    apiKey: string;
    setApiKey: React.Dispatch<React.SetStateAction<string>>;
    autoScroll: boolean;
    setAutoScroll: React.Dispatch<React.SetStateAction<boolean>>;
    autoOpen: boolean;
    setAutoOpen: React.Dispatch<React.SetStateAction<boolean>>;
    autoRefresh: boolean;
    setAutoRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    debug: boolean;
    setDebug: React.Dispatch<React.SetStateAction<boolean>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    mode: AppMode;
    setMode: React.Dispatch<React.SetStateAction<AppMode>>;
}

export function useApp() {
    return React.useContext(AppContext);
}

export function AppProvider({ children }: { children: JSX.Element }) {
    const [advanced, setAdvanced] = useState(false);
    const [apiKey, setApiKey] = useState("");
    const [autoScroll, setAutoScroll] = useState(true);
    const [autoOpen, setAutoOpen] = useState(true);
    const [autoRefresh, setAutoRefresh] = useState(true);
    const [debug, setDebug] = useState(false);
    const [email, setEmail] = useState("");
    const [mode, setMode] = useState<AppMode>("visual-editor");

    useEffect(() => {
        chrome.storage.local.get(
            [
                "advanced",
                "apiKey",
                "autoScroll",
                "autoOpen",
                "autoRefresh",
                "debug",
                "email"
            ],
            ({
                advanced,
                apiKey,
                autoScroll,
                autoOpen,
                autoRefresh,
                debug,
                email
            }) => {
                if (advanced !== undefined)
                    setAdvanced(advanced);
                if (apiKey !== undefined)
                    setApiKey(apiKey);
                if (autoScroll !== undefined)
                    setAutoScroll(autoScroll);
                if (autoOpen !== undefined)
                    setAutoOpen(autoOpen);
                if (autoRefresh !== undefined)
                    setAutoRefresh(autoRefresh);
                if (debug !== undefined)
                    setDebug(debug);
                if (email !== undefined)
                    setEmail(email);
            }
        );
    }, []);

    useEffect(() => {
        chrome.storage.local.set({
            advanced,
            apiKey,
            autoScroll,
            autoOpen,
            autoRefresh,
            debug,
            email
        });
    }, [
        advanced,
        apiKey,
        autoScroll,
        autoOpen,
        autoRefresh,
        debug,
        email
    ]);

    const value = {
        advanced,
        setAdvanced,
        apiKey,
        setApiKey,
        autoScroll,
        setAutoScroll,
        autoOpen,
        setAutoOpen,
        autoRefresh,
        setAutoRefresh,
        debug,
        setDebug,
        email,
        setEmail,
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