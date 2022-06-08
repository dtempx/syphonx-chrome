import React, { useState } from "react";

const defaultScript = `[
    { "select": [
        {
            "name": "title",
            "type": "string",
            "$": [["h1"]]
        },
        {
            "name": "href",
            "type": "string",
            "$": [["a",["attr","href"]]]
        }
    ]}
]`;

export interface AppState {
    script: string;
    data: unknown;
    setScript: React.Dispatch<React.SetStateAction<string>>;
    setData: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = React.createContext<AppState>({} as AppState);

export function useApp() {
    return React.useContext(AppContext);
}

export function AppProvider({ children }: { children: JSX.Element }) {
    const [script, setScript] = useState(defaultScript);
    const [data, setData] = useState("");

    const value = {
        script,
        data,
        setScript,
        setData
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}
