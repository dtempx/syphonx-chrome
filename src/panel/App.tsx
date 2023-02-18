import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppProvider } from "./context";
import TemplateEditor from "./TemplateEditor";
import theme from "./theme";

import "@fontsource/roboto";
import "./App.css";

export default () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppProvider>
            <TemplateEditor />
        </AppProvider>
    </ThemeProvider>
);