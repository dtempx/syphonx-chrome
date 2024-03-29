import React, { useEffect, useRef, useState } from "react";
import { background } from "./lib";

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
    editTracking: boolean;
    setEditTracking: React.Dispatch<React.SetStateAction<boolean>>;
    pageTracking: boolean;
    setPageTracking: React.Dispatch<React.SetStateAction<boolean>>;
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
    const [editTracking, setEditTracking] = useState(true);
    const [pageTracking, setPageTracking] = useState(false);
    const [mode, setMode] = useState<AppMode>("visual-editor");
    const [serviceUrl, setServiceUrl] = useState("");
    const [inspectedWindowUrl, setInspectedWindowUrl] = useState("");
    const inspectedWindowUrlRef = useRef(inspectedWindowUrl);
    const lastEventTimeRef = useRef(0);

    /*
        NOTES:
        - Ensure the onNavigated event updates only once per navigation
        - Update the background if the page is refreshed with the same URL
        - Use refs to capture state within the async handler inside the useEffect closure, otherwise it only the initial state is captured
        - Unhook the event handler when the component unmounts
    */
    useEffect(() => {
        const handleNavigationCompleted = async ({ frameId, tabId }: chrome.webNavigation.WebNavigationFramedCallbackDetails) => {
            if (frameId !== 0)
                return; // skip if not the top-level frame
            if (Date.now() - lastEventTimeRef.current < 2000)
                return; // skip spurious events that happen on some pages
            // if the tabId matches the inspected window and the URL is different, update the URL
            if (tabId === chrome.devtools.inspectedWindow.tabId) {
                const tab = await chrome.tabs.get(chrome.devtools.inspectedWindow.tabId);
                if (tab?.url) {
                    // check for page reload case where url is the same
                    if (tab.url === inspectedWindowUrlRef.current)
                        setInspectedWindowUrl(""); // set an intermediate empty state to force the other useEffect to be retriggered with the same url
                    setInspectedWindowUrl(tab.url);
                    inspectedWindowUrlRef.current = tab.url;
                    lastEventTimeRef.current = Date.now();
                }
            }
        };

        // attach the webNavigation.onCompleted event listener.
        chrome.webNavigation.onCompleted.addListener(handleNavigationCompleted);

        // set the initial page
        (async () => {
            const tabId = chrome.devtools.inspectedWindow.tabId;
            const tab = await chrome.tabs.get(tabId);
            if (tab?.url) {
                setInspectedWindowUrl(tab.url);
                inspectedWindowUrlRef.current = tab.url;
            }
        })();

        // detach the event listener when component unmounts.
        return () => {
            chrome.webNavigation.onCompleted.removeListener(handleNavigationCompleted);
        };
    }, []);

    useEffect(() => {
        if (inspectedWindowUrl)
            background.navigated(inspectedWindowUrl, pageTracking);
    }, [inspectedWindowUrl]);

    useEffect(() => {
        if (pageTracking)
            background.enableTracking();
        else
            background.disableTracking();
    }, [pageTracking]);

    useEffect(() => {
        chrome.storage.local.get(
            [
                "advanced",
                "autoOpen",
                "autoRefresh",
                "debug",
                "editTracking",
                "serviceUrl"
            ],
            ({
                advanced,
                autoOpen,
                autoRefresh,
                debug,
                editTracking,
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
                if (editTracking !== undefined)
                    setEditTracking(editTracking);
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
            editTracking,
            serviceUrl,
        });
    }, [
        advanced,
        autoOpen,
        autoRefresh,
        debug,
        editTracking,
        serviceUrl
    ]);

    useEffect(() => {
        (global as any).serviceUrl = serviceUrl;
    }, [serviceUrl]);

    const value = {
        advanced,
        setAdvanced,
        autoOpen,
        setAutoOpen,
        autoRefresh,
        setAutoRefresh,
        debug,
        setDebug,
        pageTracking,
        setPageTracking,
        editTracking,
        setEditTracking,
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