import React, { useState } from "react";

export interface Click {
    altKey: boolean;
    button: number;
    ctrlKey: boolean;
    shiftKey: boolean;
    x: number;
    y: number;
}

export interface PageState {
    click: Click | undefined;
}

export const PageContext = React.createContext<PageState>({
    click: undefined
});

export function PageProvider({ children }: { children: JSX.Element }) {
    const [click, setClick] = useState<Click | undefined>();
 
    const value = {
        click,
        clearClick: () => setClick(undefined)
    };

    chrome.runtime.onMessage.addListener(message => {
        setClick(message.click);
    });

    return (
        <PageContext.Provider value={value}>
            {children}
        </PageContext.Provider>
    );
}
