import React, { useEffect, useState } from "react";
import { SyphonXApi } from "syphonx-lib";
import { Portal } from "./Portal";

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
    serviceUrl: string;
    setServiceUrl: React.Dispatch<React.SetStateAction<string>>;
    portal: Portal | undefined;
    setPortal: React.Dispatch<React.SetStateAction<Portal | undefined>>;
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
    const [serviceUrl, setServiceUrl] = useState("");
    const [portal, setPortal] = useState<Portal | undefined>(undefined);

    useEffect(() => {
        chrome.storage.local.get(
            [
                "advanced",
                "apiKey",
                "autoScroll",
                "autoOpen",
                "autoRefresh",
                "debug",
                "email",
                "serviceUrl"
            ],
            ({
                advanced,
                apiKey,
                autoScroll,
                autoOpen,
                autoRefresh,
                debug,
                email,
                serviceUrl
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
                if (serviceUrl !== undefined)
                    setServiceUrl(serviceUrl);
            }
        );
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const api = new SyphonXApi(apiKey, serviceUrl);
                const auth = await api.auth();
                setPortal(auth.portal);
            }
            catch(err) {
                debugger;
                console.error(err);
                setPortal(undefined);
            }
        })();
    }, [apiKey, serviceUrl]);

    useEffect(() => {
        chrome.storage.local.set({
            advanced,
            apiKey,
            autoScroll,
            autoOpen,
            autoRefresh,
            debug,
            email,
            serviceUrl
        });
    }, [
        advanced,
        apiKey,
        autoScroll,
        autoOpen,
        autoRefresh,
        debug,
        email,
        serviceUrl
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
        setMode,
        serviceUrl,
        setServiceUrl,
        portal,
        setPortal
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

const AppContext = React.createContext<AppState>({} as AppState);