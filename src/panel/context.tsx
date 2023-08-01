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
    hotTracking: boolean;
    setHotTracking: React.Dispatch<React.SetStateAction<boolean>>;
    mode: AppMode;
    setMode: React.Dispatch<React.SetStateAction<AppMode>>;
    serviceUrl: string;
    setServiceUrl: React.Dispatch<React.SetStateAction<string>>;
    inspectedWindowUrl: string;
}

export function useApp() {
    return React.useContext(AppContext);
}

export function AppProvider({ children }: React.PropsWithChildren<{}>) {
    const [advanced, setAdvanced] = useState(false);
    const [autoOpen, setAutoOpen] = useState(true);
    const [autoRefresh, setAutoRefresh] = useState(true);
    const [debug, setDebug] = useState(false);
    const [hotTracking, setHotTracking] = useState(true);
    const [mode, setMode] = useState<AppMode>("visual-editor");
    const [serviceUrl, setServiceUrl] = useState("");
    const [inspectedWindowUrl, setInspectedWindowUrl] = useState("");

    // update inspectedWindowUrl when the inspected window is re-navigated
    chrome.devtools.network.onNavigated.addListener(url => {
        setInspectedWindowUrl(url)
    });

    useEffect(() => {
        (async () => {
            try {
                const tabId = chrome.devtools.inspectedWindow.tabId;
                const tab = await chrome.tabs.get(tabId);
                if (tab?.url)
                    setInspectedWindowUrl(tab.url);
            }
            catch (err) {
                debugger;
                console.error(err);
            }
        })();
    }, []);

    useEffect(() => {
        chrome.storage.local.get(
            [
                "advanced",
                "autoOpen",
                "autoRefresh",
                "debug",
                "hotTracking",
                "serviceUrl"
            ],
            ({
                advanced,
                hotTracking,
                autoOpen,
                autoRefresh,
                debug,
                serviceUrl
            }) => {
                if (advanced !== undefined)
                    setAdvanced(advanced);
                if (autoOpen !== undefined)
                    setAutoOpen(autoOpen);
                if (autoRefresh !== undefined)
                    setAutoRefresh(autoRefresh);
                if (debug !== undefined)
                    setDebug(debug);
                if (hotTracking !== undefined)
                    setHotTracking(hotTracking);
                if (serviceUrl !== undefined)
                    setServiceUrl(serviceUrl);
            }
        );
    }, []);

    useEffect(() => {
        chrome.storage.local.set({
            advanced,
            autoOpen,
            autoRefresh,
            debug,
            hotTracking,
            serviceUrl,
        });
    }, [
        advanced,
        autoOpen,
        autoRefresh,
        debug,
        hotTracking,
        serviceUrl
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
        hotTracking,
        setHotTracking,
        mode,
        setMode,
        serviceUrl,
        setServiceUrl,
        inspectedWindowUrl
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

const AppContext = React.createContext<AppState>({} as AppState);