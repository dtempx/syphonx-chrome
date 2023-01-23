import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppProvider, TemplateProvider } from "./context";
import TemplateEditor from "./TemplateEditor";
import theme from "./theme";

export default () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppProvider>
            <TemplateProvider>
                <TemplateEditor />
            </TemplateProvider>
        </AppProvider>
    </ThemeProvider>
);