import React, { useEffect, useState } from "react";
import { cloud } from "../lib";

export interface DebugState {
    serviceUrl: string;
    setServiceUrl: React.Dispatch<React.SetStateAction<string>>;
}

export const DebugContext = React.createContext<DebugState>({
    serviceUrl: "",
    setServiceUrl: () => {},
});

export function DebugProvider({ children }: { children: JSX.Element }) {
    const [serviceUrl, setServiceUrl] = useState("");

    useEffect(() => {
        cloud.setServiceUrl(serviceUrl);
    }, [serviceUrl]);

    const value = {
        serviceUrl,
        setServiceUrl
    };

    return (
        <DebugContext.Provider value={value}>
            {children}
        </DebugContext.Provider>
    );
}
