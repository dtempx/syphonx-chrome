import React from "react";
import { useApp } from "../../context";

import {
    Link,
} from "@mui/material";

export default () => {
    const { setEmail, setUser, setVerified, } = useApp();

    const handleLogout = () => {
        setEmail("");
        setUser(undefined);
        setVerified(false);
    }

    return <>
        <Link
            component="button"
            variant="body2"
            onClick={handleLogout}
            sx={{ padding: "20px", }}
            >
            Logout
        </Link>
    </>
}
