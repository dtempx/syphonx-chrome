import React from "react";

import { ContractProvider } from "./ContractContext";
import { DataProvider } from "./DataContext";
import { DebugProvider } from "./DebugContext";
import { PageProvider } from "./PageContext";
import { TemplateProvider } from "./TemplateContext";

export default ({ children }: { children: JSX.Element }) => (
    <DebugProvider>
        <TemplateProvider>
            <ContractProvider>
                <PageProvider>
                    <DataProvider>
                        {children}
                    </DataProvider>
                </PageProvider>
            </ContractProvider>
        </TemplateProvider>
    </DebugProvider>
);