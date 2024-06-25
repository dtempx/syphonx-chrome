import React from "react";
import ContractView from "./ContractView";
import ErrorView from "./ErrorView";
import JsonView from "./JsonView";
import LogView from "./LogView";
import PortalView from "./PortalView";
import ResponseView from "./ResponseView";
import TableView from "./TableView";
import { DataViewMode } from "./DataViewMode";

import {
    Box
} from "@mui/material";

export interface Props {
    mode: DataViewMode;
}

export default ({ mode }: Props) => (
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
)
