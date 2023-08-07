import React, { useContext, useEffect, useState } from "react";
import { useApp } from "../../context";
import { page } from "../lib";

export interface PageState {
    selectors: string[];
    setSelectors: React.Dispatch<React.SetStateAction<string[]>>;
    html: string;
    output: Array<string | null>;
    targets: number[];
}

export const PageContext = React.createContext<PageState>({
    selectors: [],
    setSelectors: () => {},
    html: "",
    output: [],
    targets: []
});


export function usePage(): PageState {
    return useContext(PageContext);
}

export function PageProvider({ children }: { children: JSX.Element }) {
    const { inspectedWindowUrl } = useApp();
    const [selectors, setSelectors] = useState<string[]>([]);
    const [html, setHtml] = useState("");
    const [output, setOutput] = useState<Array<string | null>>([]);
    const [targets, setTargets] = useState<number[]>([]);
 
    const value = {
        selectors,
        setSelectors,
        html,
        output,
        targets
    };

    useEffect(() => {
        (async () => {
            const { html, output, targets } = await page.select(selectors[0]);
            setHtml(html);
            setOutput(output);
            setTargets(targets);
        })();

        return () => {
            page.deselect();
        };
    }, [selectors, inspectedWindowUrl]);

    return (
        <PageContext.Provider value={value}>
            {children}
        </PageContext.Provider>
    );
}

