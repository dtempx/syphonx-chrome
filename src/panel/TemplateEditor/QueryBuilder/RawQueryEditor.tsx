import React, { useEffect, useState } from "react";
import * as syphonx from "syphonx-lib";
import { ValidateTextField } from "../../../components";

export interface Props {
    query: syphonx.SelectQuery;
    onChange: (event: React.SyntheticEvent, query: syphonx.SelectQuery) => void;
}

export default ({ query, onChange }: Props) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        const value = syphonx.formatJQueryExpression(query);
        setValue(value || "");
    }, [query]);

    function validate(event: React.ChangeEvent<HTMLInputElement>, value: string): boolean {
        try {            
            syphonx.parseJQueryExpression(event.target.value);
            return true;
        }
        catch (err) {
            return false;
        }
    }

    function commit(event: React.SyntheticEvent, value: string) {
        if (value) {
            let query: syphonx.SelectQuery | undefined;
            try {
                query = syphonx.parseJQueryExpression(value);
            }
            catch (err) {
                console.error("Attempt to commit invalid query", err); // validation should prevent this from ever happening
                return;
            }
            if (query)
                onChange(event, query);
        }
    }
    
    return (
        <ValidateTextField
            variant="standard"
            size="small"
            fullWidth
            value={value}
            onValidate={validate}
            onChange={commit}
        />
    );
};