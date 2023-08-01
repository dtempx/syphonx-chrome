import React from "react";

import { DataProvider } from "./DataContext";
import { PageProvider } from "./PageContext";
import { TemplateProvider } from "./TemplateContext";
import { UserProvider } from "./UserContext";

export default ({ children }: { children: JSX.Element }) => (
    <UserProvider>
        <TemplateProvider>
            <PageProvider>
                <DataProvider>
                    {children}
                </DataProvider>
            </PageProvider>
        </TemplateProvider>
    </UserProvider>
);