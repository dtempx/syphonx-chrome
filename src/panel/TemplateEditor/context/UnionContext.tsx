import React from "react";

import { DataProvider } from "./DataContext";
import { PageProvider } from "./PageContext";
import { QueryBuilderProvider } from "./QueryBuilderContext";
import { PortalProvider } from "./PortalContext";
import { TemplateProvider } from "./TemplateContext";
import { UserProvider } from "./UserContext";

export default ({ children }: { children: JSX.Element }) => (
    <UserProvider>
        <TemplateProvider>
            <PortalProvider>
                <PageProvider>
                    <QueryBuilderProvider>
                        <DataProvider>
                            {children}
                        </DataProvider>
                    </QueryBuilderProvider>
                </PageProvider>
            </PortalProvider>
        </TemplateProvider>
    </UserProvider>
);