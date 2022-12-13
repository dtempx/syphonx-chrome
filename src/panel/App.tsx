import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppProvider } from "./AppContext";
import { TemplateProvider } from "./TemplateContext";
import ActionEditor from "./ActionEditor";
import theme from "./theme";

export default () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppProvider>
            <TemplateProvider>
                <ActionEditor />
            </TemplateProvider>
        </AppProvider>
    </ThemeProvider>
);
