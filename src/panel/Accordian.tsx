import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography } from "@mui/material";
import * as Icons from "@mui/icons-material";
import TemplateView from "./TemplateView/index";
import DataView from "./DataView";

export default () => {
    const [scriptExpanded, setScriptExpanded] = useState(true);
    const [dataExpanded, setDataExpanded] = useState(true);

    return (
        <Box>
            <Accordion expanded={scriptExpanded} onChange={(event, isExpanded) => setScriptExpanded(isExpanded)}>
                <AccordionSummary
                    expandIcon={<Icons.ExpandMore />}
                    aria-controls="script-content"
                    id="script"
                >
                    <Typography>Template XYZ</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: "#ebedf0" }}>
                    <TemplateView />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={dataExpanded} onChange={(event, isExpanded) => setDataExpanded(isExpanded)}>
                <AccordionSummary
                    expandIcon={<Icons.ExpandMore />}
                    aria-controls="data-content"
                    id="data"
                >
                    <Typography>Data</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <DataView />
                </AccordionDetails>
            </Accordion>
        </Box>
);
}