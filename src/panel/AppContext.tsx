import React, { useState } from "react";

export interface AppState {
    mode: string;
}

const AppContext = React.createContext<AppState>({} as AppState);

export function useApp() {
    return React.useContext(AppContext);
}

export function AppProvider({ children }: { children: JSX.Element }) {
    const [mode, setMode] = useState("");

    const value = {
        mode,
        setMode
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}