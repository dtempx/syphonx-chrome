import React, { useEffect, useState } from "react";
import { Schema } from "jsonschema";
import { cloud, tryParseJson } from "../lib";

export interface ContractState {
    contractFile: string;
    setContractFile: React.Dispatch<React.SetStateAction<string>>;
    contractLoading: boolean;
    contractError: string;
    contract: Schema | undefined;
}

export const ContractContext = React.createContext<ContractState>({
    contractFile: "",
    setContractFile: () => {},
    contractLoading: false,
    contractError: "",
    contract: undefined
});

export function ContractProvider({ children }: { children: JSX.Element }) {
    const [contractFile, setContractFile] = useState("");
    const [contractLoading, setContractLoading] = useState(false);
    const [contractError, setContractError] = useState("");
    const [contract, setContract] = useState<Schema | undefined>();

    useEffect(() => {
        (async () => {
            setContract(undefined);
            if (contractFile) {
                setContractLoading(true);
                try {
                    const json = await cloud.read(contractFile);
                    const contract = tryParseJson(json);
                    if (contract)
                        setContract(contract);
                    else
                        setContractError("Format of contract JSON is invalid.");
                }
                catch (err) {
                    debugger;
                    setContractError(err instanceof Error ? err.message : JSON.stringify(err));
                }
            }
        })();
        setContractLoading(false);
    }, [contractFile]);

    const value = {
        contractFile,
        setContractFile,
        contractLoading,
        contractError,
        contract
    };

    return (
        <ContractContext.Provider value={value}>
            {children}
        </ContractContext.Provider>
    );
}
