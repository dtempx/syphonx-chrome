import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppProvider } from "./context";
import TemplateEditor from "./TemplateEditor";
import theme from "./theme";

export default () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppProvider>
            <TemplateEditor />
        </AppProvider>
    </ThemeProvider>
);