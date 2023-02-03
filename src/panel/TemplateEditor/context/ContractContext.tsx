import React, { useContext, useEffect, useState } from "react";
import { Schema } from "jsonschema";
import { cloud, tryParseJson } from "../lib";

export interface ContractState {
    file: string;
    setFile: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    error: string;
    contract: Schema | undefined;
}

const ContractContext = React.createContext<ContractState>({
    file: "",
    setFile: () => {},
    loading: false,
    error: "",
    contract: undefined
});

export function ContractProvider({ children }: { children: JSX.Element }) {
    const [file, setFile] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [contract, setContract] = useState<Schema | undefined>();

    useEffect(() => {
        (async () => {
            setContract(undefined);
            setLoading(true);
            try {
                const json = await cloud.read(file);
                const contract = tryParseJson(json);
                if (contract)
                    setContract(contract);
                else
                    setError("Format of contract JSON is invalid.");
            }
            catch (err) {
                debugger;
                setError(err instanceof Error ? err.message : JSON.stringify(err));
            }
        })();
        setLoading(false);
    }, [file]);

    const value = {
        file,
        setFile,
        loading,
        error,
        contract
    };

    return (
        <ContractContext.Provider value={value}>
            {children}
        </ContractContext.Provider>
    );
}

export function useContract() {
    return useContext(ContractContext);
}