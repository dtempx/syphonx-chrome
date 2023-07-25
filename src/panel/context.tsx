import React, { useEffect, useState } from "react";
import { SyphonXApi } from "syphonx-lib";
import { Portal } from "./Portal";
import { getUser, User, validateSession } from "./TemplateEditor/lib/cloud";

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
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    hotTracking: boolean;
    setHotTracking: React.Dispatch<React.SetStateAction<boolean>>;
    mode: AppMode;
    setMode: React.Dispatch<React.SetStateAction<AppMode>>;
    serviceUrl: string;
    setServiceUrl: React.Dispatch<React.SetStateAction<string>>;
    portal: Portal | undefined;
    setPortal: React.Dispatch<React.SetStateAction<Portal | undefined>>;
    inspectedWindowUrl: string;
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    verified: boolean;
    setVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useApp() {
    return React.useContext(AppContext);
}

export function AppProvider({ children }: React.PropsWithChildren<{}>) {
    const [advanced, setAdvanced] = useState(false);
    const [autoOpen, setAutoOpen] = useState(true);
    const [autoRefresh, setAutoRefresh] = useState(true);
    const [debug, setDebug] = useState(false);
    const [email, setEmail] = useState("");
    const [hotTracking, setHotTracking] = useState(true);
    const [mode, setMode] = useState<AppMode>("visual-editor");
    const [serviceUrl, setServiceUrl] = useState("");
    const [portal, setPortal] = useState<Portal | undefined>(undefined);
    const [inspectedWindowUrl, setInspectedWindowUrl] = useState("");
    const [user, setUser] = useState<User | undefined>(undefined);
    const [verified, setVerified] = useState<boolean>(false);

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
                "email",
                "hotTracking",
                "serviceUrl"
            ],
            ({
                advanced,
                hotTracking,
                autoOpen,
                autoRefresh,
                debug,
                email,
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
                if (email !== undefined)
                    setEmail(email);
                if (hotTracking !== undefined)
                    setHotTracking(hotTracking);
                if (serviceUrl !== undefined)
                    setServiceUrl(serviceUrl);
            }
        );
    }, []);

    useEffect(() => {
        (async () => {
            try {
                if (!portal) { // to prevent repetitive calls...
                    const token = user?.id ? `u/${user.id}` : undefined;
                    const api = new SyphonXApi(token, serviceUrl);
                    const auth = await api.auth();
                    setPortal(auth.portal);
                }
            } catch(err) {
                debugger;
                console.error(err);
                setPortal(undefined);
            }

            if (user)
                setVerified(validateSession(user));
            else
                setVerified(false);
        })();
    }, [user, serviceUrl]);

    useEffect(() => {
        (async () => {
            if (email?.length) {
                const user = await getUser(email, serviceUrl);
                if (user)
                    setUser(user);
            } else if (email?.length === 0) {
                setUser(undefined);
            }
        })();
    }, [email]);

    useEffect(() => {
        chrome.storage.local.set({
            advanced,
            autoOpen,
            autoRefresh,
            debug,
            email,
            hotTracking,
            serviceUrl
        });
    }, [
        advanced,
        autoOpen,
        autoRefresh,
        debug,
        email,
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
        email,
        setEmail,
        hotTracking,
        setHotTracking,
        mode,
        setMode,
        serviceUrl,
        setServiceUrl,
        portal,
        setPortal,
        inspectedWindowUrl,
        user,
        setUser,
        verified,
        setVerified
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

const AppContext = React.createContext<AppState>({} as AppState);