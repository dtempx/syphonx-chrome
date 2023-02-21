import React from "react";

import { ContractProvider } from "./ContractContext";
import { TemplateProvider } from "./TemplateContext";
import { DataProvider } from "./DataContext";

export default ({ children }: { children: JSX.Element }) => (
    <TemplateProvider>
        <ContractProvider>
            <DataProvider>
                {children}
            </DataProvider>
        </ContractProvider>
    </TemplateProvider>
);