import React from "react";

import { DataProvider } from "./DataContext";
import { PageProvider } from "./PageContext";
import { PortalProvider } from "./PortalContext";
import { TemplateProvider } from "./TemplateContext";
import { UserProvider } from "./UserContext";

export default ({ children }: { children: JSX.Element }) => (
    <UserProvider>
        <TemplateProvider>
            <PortalProvider>
                <PageProvider>
                    <DataProvider>
                        {children}
                    </DataProvider>
                </PageProvider>
            </PortalProvider>
        </TemplateProvider>
    </UserProvider>
);