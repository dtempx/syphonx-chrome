import React from "react";

import { DataProvider } from "./DataContext";
import { DebugProvider } from "./DebugContext";
import { PageProvider } from "./PageContext";
import { TemplateProvider } from "./TemplateContext";

export default ({ children }: { children: JSX.Element }) => (
    <DebugProvider>
        <TemplateProvider>
            <PageProvider>
                <DataProvider>
                    {children}
                </DataProvider>
            </PageProvider>
        </TemplateProvider>
    </DebugProvider>
);