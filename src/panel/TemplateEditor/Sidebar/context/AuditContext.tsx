import React, { useContext, useEffect, useState } from "react";

import {
    BoundingRect,
    RestApi
} from "../lib";

const api = new RestApi("https://api.syphonx.io");

export interface Audit {
    id: string;
    name: string;
    url: string;
    selectors: AuditSelector[];
    status: string;
    comment?: string;
    html?: string;
}

export interface AuditSelector {
    name: string;
    type: string;
    repeated: boolean;
    selector?: string;
    status?: string;
    comment?: string;
    html?: string;
    html_linenums?: number[];
    text?: string;
    screenshot?: string;
    screenshot_rect?: BoundingRect;
    selector_rect?: BoundingRect[];
    alt_clicks?: string[];
}

export type AuditStatus = "serving" | "submitting" | "ready" | "empty" | "error";

export interface AuditState {
    audit: Audit | undefined;
    setAudit: React.Dispatch<React.SetStateAction<Audit | undefined>>;
    status: AuditStatus | undefined;
    error: string | undefined;
    submitAudit: (audit: Audit) => Promise<void>;
    nextAudit: () => Promise<void>;
}

export const AuditContext = React.createContext<AuditState>({
    audit: undefined,
    setAudit: () => {},
    status: undefined,
    error: undefined,
    submitAudit: async (audit: Audit) => {},
    nextAudit: async () => {}
});

export function useAudit() {
    return useContext(AuditContext);
}

export function AuditProvider({ children }: { children: JSX.Element }) {
    const [audit, setAudit] = useState<Audit | undefined>();
    const [status, setStatus] = useState<AuditStatus | undefined>();
    const [error, setError] = useState<string | undefined>();
 
    useEffect(() => {
        setError(undefined);
        if (audit) {
            // if all selectors are set then auto-submit...
            if (!!audit.status || audit.selectors.every(target => !!target.selector || !!target.status)) {
                (async audit => {
                    try {
                        await submitAudit(audit);
                        await nextAudit(); // auto-serve
                    }
                    catch (err) {
                        setStatus("error");
                        setError(err instanceof Error ? err.message : String(err));
                    }
                })(audit);
            }
        }
    }, [audit]);

    async function submitAudit(audit: Audit): Promise<void> {
        setStatus("submitting");
        (async audit => {
            try {
                await api.postJson("/audit", audit);
                setStatus("ready");
                setError(undefined);
            }
            catch (err) {
                setStatus("error");
                setError(err instanceof Error ? err.message : String(err));
            }
        })(audit);
    }

    async function nextAudit(): Promise<void> {
        try {
            setStatus("serving");
            const audit = await api.json("/audit");
            setAudit(audit);
            setStatus(audit ? "ready" : "empty");
            setError(undefined);
        }
        catch (err) {
            setStatus("error");
            setError(err instanceof Error ? err.message : String(err));
        }
    }

    const value = {
        audit,
        setAudit,
        status,
        error,
        submitAudit,
        nextAudit
    };

    return (
        <AuditContext.Provider value={value}>
            {children}
        </AuditContext.Provider>
    );
}
