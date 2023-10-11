import React, { useContext, useEffect, useState } from "react";
import { useApp } from "../../context";
import { deselectAll, runActiveQuery, ActiveQueryResult } from "../lib";
import { SelectQuery } from "syphonx-lib";

export interface QueryBuilderState {
    activeQuery: SelectQuery | undefined;
    setActiveQuery: React.Dispatch<React.SetStateAction<SelectQuery | undefined>>;
    activeQueryResult: ActiveQueryResult[];
}

export const QueryBuilderContext = React.createContext<QueryBuilderState>({
    activeQuery: undefined,
    setActiveQuery: () => {},
    activeQueryResult: [],
});

export function usePageQuery(): QueryBuilderState {
    return useContext(QueryBuilderContext);
}

export function QueryBuilderProvider({ children }: { children: JSX.Element }) {
    const { inspectedWindowUrl } = useApp();
    const [activeQuery, setActiveQuery] = useState<SelectQuery | undefined>();
    const [activeQueryResult, setActiveQueryResult] = useState<ActiveQueryResult[]>([]);
 
    const value = {
        activeQuery,
        setActiveQuery,
        activeQueryResult
    };

    useEffect(() => {
        if (activeQuery) {
            (async () => {
                const result = await runActiveQuery(activeQuery);
                setActiveQueryResult(result);
            })();
        }
        else {
            setActiveQueryResult([]);
        }

        return () => {
            deselectAll();
        };
    }, [activeQuery, inspectedWindowUrl]);

    return (
        <QueryBuilderContext.Provider value={value}>
            {children}
        </QueryBuilderContext.Provider>
    );
}
