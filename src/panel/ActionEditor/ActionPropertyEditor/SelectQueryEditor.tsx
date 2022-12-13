import React, { useEffect } from "react";
import * as syphonx from "syphonx-lib";
import { EditField } from "../../../components/";
import * as background from "../../../background-proxy";

export interface Props {
    query: syphonx.SelectQuery[] | undefined;
    onChange: (event: React.SyntheticEvent, query: syphonx.SelectQuery[] | undefined) => void;
}

export default ({ query, onChange }: Props) => {
    const value = query ? syphonx.formatJQueryExpression(query[0]) : "";

    if (background.active) {
        useEffect(() => {
            background.highlightElements(query && query[0] ? query[0][0] : "");
        }, [query]);
    }

    function handleChange(event: React.SyntheticEvent, value: string) {
        if (value) {
            const query = syphonx.parseJQueryExpression(value);
            if (query) {
                onChange(event, [query]);
            }
        }
        else {
            onChange(event, undefined);
        }
    }
    
    function validateSelectQuery(value: string): boolean {
        if (value) {
            let valid = false;
            try {
                valid = syphonx.parseJQueryExpression(value) !== undefined;
            }
            catch(err) {
            }
            return valid;
        }
        else {
            return true;
        }
    }
    
    return (
        <EditField
            variant="standard"
            size="small"
            value={value}
            onChange={handleChange}
            onValidate={validateSelectQuery}
        />
    );
};