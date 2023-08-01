import React, { useState } from "react";
import ContractView from "./ContractView";
import ErrorView from "./ErrorView";
import JsonView from "./JsonView";
import LogView from "./LogView";
import PortalView from "./PortalView";
import ResponseView from "./ResponseView";
import TableView from "./TableView";
import Toolbar, { DataViewMode } from "./Toolbar";

import {
    Box,
    Stack
} from "@mui/material";

export default () => {
    const [mode, setMode] = useState<DataViewMode>("table");
    return (
        <Stack
            direction="column"
            sx={{
                height: "auto"
            }}
        >
            <Toolbar mode={mode} onChange={(event, mode) => setMode(mode)} />
            <Box
                sx={{
                    height: 800,
                    overflow: "auto",
                    m: 1
                }}
            >
                { mode === "table"    && <TableView />    }
                { mode === "json"     && <JsonView />     }
                { mode === "contract" && <ContractView /> }
                { mode === "log"      && <LogView />      }
                { mode === "raw"      && <ResponseView /> }
                { mode === "errors"   && <ErrorView />    }
                { mode === "portal"   && <PortalView />   }
            </Box>
        </Stack>
    );
}