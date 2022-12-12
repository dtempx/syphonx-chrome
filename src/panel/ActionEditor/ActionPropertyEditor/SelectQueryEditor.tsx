import React from "react";
import * as syphonx from "syphonx-lib";
import { EditField } from "../../../components/";

export interface Props {
    query: syphonx.SelectQuery[] | undefined;
    onChange: (event: React.SyntheticEvent, query: syphonx.SelectQuery[] | undefined) => void;
}

export default ({ query, onChange }: Props) => {
    const value = query ? syphonx.formatJQueryExpression(query[0]) : "";

    function handleChange(event: React.SyntheticEvent, value: string) {
        if (value) {
            const query = syphonx.parseJQueryExpression(value);
            if (query)
                onChange(event, [query]);
        }
        else {
            onChange(event, undefined);
        }
    }
    
    function validateSelectQuery(value: string): boolean {
        if (value) {
            return syphonx.parseJQueryExpression(value) !== undefined;
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