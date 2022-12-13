import * as React from 'react';
import { Box, Drawer } from "@mui/material";
import { MenuList } from "../../components";
import * as Icons from "@mui/icons-material";

export interface Props {
    open: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent | {}) => void
}

export default ({ open, onClose }: Props) => (
    <Drawer
        anchor="left"
        open={open}
        onClose={event => onClose(event)}
    >
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={event => onClose(event)}
            onKeyDown={event => onClose(event)}
        >
            <MenuList items={[
                ["Open", <Icons.FileOpen />, event => onClose(event)],
                ["Save", <Icons.Save />, event => onClose(event)],
                ["Save As", <Icons.SaveAs />, event => onClose(event)]
            ]} />
        </Box>
    </Drawer>
);