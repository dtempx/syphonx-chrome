import React, { useEffect, useRef, useState } from "react";
import { background } from "./lib";


export type AppMode = "visual-editor" | "code-editor" | "test-runner" | "template-settings";

export interface AutorunSettings {
    mode?: "all" | "include" | "exclude";
    domains?: string[];
}

export interface AppState {
    advanced: boolean;
    setAdvanced: React.Dispatch<React.SetStateAction<boolean>>;
    autoOpen: boolean;
    setAutoOpen: React.Dispatch<React.SetStateAction<boolean>>;
    autoRefresh: boolean;
    setAutoRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    autorun: AutorunSettings | undefined;
    setAutorun: React.Dispatch<React.SetStateAction<AutorunSettings | undefined>>;
    currentDirectory: string;
    setCurrentDirectory: React.Dispatch<React.SetStateAction<string>>;
    debug: boolean;
    setDebug: React.Dispatch<React.SetStateAction<boolean>>;
    editTracking: boolean;
    setEditTracking: React.Dispatch<React.SetStateAction<boolean>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    pageTracking: boolean;
    setPageTracking: React.Dispatch<React.SetStateAction<boolean>>;
    mode: AppMode;
    recentFiles: string[];
    updateRecentFiles(file: string): void;
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
    const [autorun, setAutorun] = useState<AutorunSettings | undefined>();
    const [currentDirectory, setCurrentDirectory] = useState("");
    const [debug, setDebug] = useState(false);
    const [editTracking, setEditTracking] = useState(true);
    const [email, setEmail] = useState("");
    const [pageTracking, setPageTracking] = useState(false);
    const [mode, setMode] = useState<AppMode>("visual-editor");
    const [recentFiles, setRecentFiles] = useState<string[]>([]);
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
                "currentDirectory",
                "debug",
                "editTracking",
                "email",
                "recentFiles",
                "serviceUrl"
            ],
            ({
                advanced,
                autoOpen,
                autoRefresh,
                currentDirectory,
                debug,
                editTracking,
                recentFiles,
                serviceUrl
            }) => {
                if (advanced !== undefined)
                    setAdvanced(advanced);
                if (autoOpen !== undefined)
                    setAutoOpen(autoOpen);
                if (autoRefresh !== undefined)
                    setAutoRefresh(autoRefresh);
                if (autorun !== undefined)
                    setAutorun(autorun);
                if (currentDirectory !== undefined)
                    setCurrentDirectory(currentDirectory);
                if (debug !== undefined)
                    setDebug(debug);
                if (editTracking !== undefined)
                    setEditTracking(editTracking);
                if (email !== undefined)
                    setEmail(email);
                if (recentFiles !== undefined)
                    setRecentFiles(recentFiles);
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
            autorun,
            currentDirectory,
            debug,
            editTracking,
            email,
            recentFiles,
            serviceUrl,
        });
    }, [
        advanced,
        autoOpen,
        autoRefresh,
        autorun,
        currentDirectory,
        debug,
        editTracking,
        email,
        recentFiles,
        serviceUrl
    ]);

    useEffect(() => {
        (global as any).serviceUrl = serviceUrl;
    }, [serviceUrl]);

    function updateRecentFiles(file: string) {
        const i = recentFiles.indexOf(file);
        if (i >= 0)
            recentFiles.splice(i, 1);
        recentFiles.unshift(file);
        setRecentFiles([...recentFiles.slice(0, 100)]);
    }

    const value = {
        advanced,
        setAdvanced,
        autoOpen,
        setAutoOpen,
        autoRefresh,
        setAutoRefresh,
        autorun,
        setAutorun,
        currentDirectory,
        setCurrentDirectory,
        debug,
        setDebug,
        email,
        setEmail,
        pageTracking,
        setPageTracking,
        editTracking,
        setEditTracking,
        mode,
        setMode,
        recentFiles,
        updateRecentFiles,
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