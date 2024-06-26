import React from "react";
import { Box, Paper } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "./components";
import { useApp, useTemplate, TemplateProvider } from "./context";
import AppBar from "./AppBar";
import AppFrame from "./AppFrame";
import CodeEditor from "./CodeEditor";
import EditorDataPanel from "./DataPanel/EditorDataPanel";
import TemplateSettings from "./TemplateSettings";
import TestRunner from "./TestRunner";
import VisualEditor from "./VisualEditor";

export default () => {
    const { mode } = useApp();
    const { setTemplate, resetExtractStatus } = useTemplate();
    return (
        <ErrorBoundary
            FallbackComponent={ErrorPage}
            onReset={() => {
                setTemplate("");
                resetExtractStatus();
            }}
        >
            <TemplateProvider>
                <Box
                    sx={{
                        overflow: "hidden",
                        minWidth: 500
                    }}
                >
                    <AppBar />
                    <AppFrame>
                        {mode === "visual-editor" && <VisualEditor />}
                        {mode === "code-editor" && <CodeEditor />}
                        {mode === "test-runner" && <TestRunner />}
                        {mode === "template-settings" && <TemplateSettings />}
                        <Paper
                            elevation={3}
                            sx={{
                                minHeight: 800,
                                width: 1,
                                m: 1,
                                p: 1
                            }}
                        >
                            <EditorDataPanel />
                        </Paper>
                    </AppFrame>
                </Box>
            </TemplateProvider>
        </ErrorBoundary>
    );
};