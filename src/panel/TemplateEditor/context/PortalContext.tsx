import React, { useEffect, useState } from "react";

import { useApp, useTemplate } from "./index";
import { cloud, Template } from "../lib";

export interface PortalState {
    dialogUrl: string | undefined;
    setDialogUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
    lastUpdated: Date | undefined;
    setLastUpdated: React.Dispatch<React.SetStateAction<Date | undefined>>;
    panelUrl: string | undefined;
    setPanelUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const PortalContext = React.createContext<PortalState>({
    dialogUrl: undefined,
    setDialogUrl: () => {},
    lastUpdated: undefined,
    setLastUpdated: () => {},
    panelUrl: undefined,
    setPanelUrl: () => {}
});

export function usePortal() {
    return React.useContext(PortalContext);
}

export function PortalProvider({ children }: { children: JSX.Element }) {
    const { inspectedWindowUrl } = useApp();
    const { template: json, templateFile, user } = useTemplate();
    const [dialogUrl, setDialogUrl] = useState<string | undefined>(undefined);
    const [lastUpdated, setLastUpdated] = useState<Date>();
    const [panelUrl, setPanelUrl] = useState<string | undefined>(undefined);

    const template = new Template(json);

    useEffect(() => {
        (async () => {
            try {
                const params = {
                    ...template.obj.params,
                    template: templateFile,
                    url: inspectedWindowUrl
                };

                const urls = await cloud.loadPortal({ params }, user?.id);

                setDialogUrl(urls?.dialogUrl);
                setPanelUrl(urls?.panelUrl);
            } catch (err) {
                debugger;
                console.error(err);
            }
        })();
    }, [templateFile]); // lastUpdated, user
    // }, [user, templateFile, template?.obj?.params]);

    const value = {
        dialogUrl,
        setDialogUrl,
        lastUpdated,
        setLastUpdated,
        panelUrl,
        setPanelUrl
    };

    return (
        <PortalContext.Provider value={value}>
            {children}
        </PortalContext.Provider>
    );
}
