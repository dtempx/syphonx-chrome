import React from "react";

import { DataProvider } from "./DataContext";
import { PageProvider } from "./PageContext";
import { TemplateProvider } from "./TemplateContext";

export default ({ children }: { children: JSX.Element }) => (
    <TemplateProvider>
        <PageProvider>
            <DataProvider>
                {children}
            </DataProvider>
        </PageProvider>
    </TemplateProvider>
);