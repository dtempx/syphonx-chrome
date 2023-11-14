import React, { useEffect, useState } from "react";
import { useTemplate } from "./context";
import { regexp } from "./lib";
import { getUser, validateSession, watchUser } from "../lib/cloud";

import { TransitionUp } from "./components";

import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    TextField
} from "@mui/material";

import {
    Close as CloseIcon
} from "@mui/icons-material"

export interface Props {
    open: boolean;
    onClose: (event: React.SyntheticEvent) => void;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default ({ open, onClose, setOpen }: Props) => {
    const { user, setUser, verified } = useTemplate();

    const [ message, setMessage ] = useState<{ severity: "success" | "info" | "warning" | "error"; message: string; }>({ severity: "info", "message": "" });
    const [ submit, setSubmit ] = useState<boolean>(false);
    const [ email, setEmail ] = useState<string>(user?.email ? user.email : "");


    function isValidEmail() {
        const result = !!email?.length && regexp.email.test(email);
        return result;
    }

    async function submitEmail() {
        if (isValidEmail()) {
            const data = await getUser(email);
            if (data) {
                setUser(data);

                if (data?.id) {
                    watchUser(data.id, result => {
                        if (result && JSON.stringify(user) !== JSON.stringify(result)) {
                            setUser(result);
                            if (validateSession(result)) {
                                setMessage({ severity: "success", message: "Your email has been verified. Enjoy working in SyphonX!" });
                                setTimeout(() => {
                                    setMessage({ severity: "info", message: "" });
                                    setSubmit(false);
                                    setEmail("");
                                    setOpen(false);
                                }, 3000);
                            }
                        }
                    });
                }

                if (!validateSession(user))
                    setMessage({ severity: "info", message: "An email has been sent to the address above, please verify." });
            }
        }
    }

    useEffect(() => {
        if (!validateSession(user) && isValidEmail())
            submitEmail();
    }, []);


    return (
        <Dialog
            fullWidth
            open={open}
            onClose={onClose}
            TransitionComponent={TransitionUp}
            maxWidth="sm"
        >
            <DialogTitle>
                <Typography>WHAT IS YOUR EMAIL?</Typography>
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        top: theme => theme.spacing(1),
                        right: theme => theme.spacing(1),
                        color: theme => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Typography fontSize="medium" pt={2} pb={4}>
                    Your email address is required to validate access and to track any revisions made by you. Please enter your email address below and we'll send you a verification link you can use to gain access to the system.
                </Typography>

                <TextField
                    variant="standard"
                    size="small"
                    fullWidth
                    onChange={(e) => setEmail(e.target.value?.toLowerCase())}
                    onKeyDown={(e) => { if (e.key === "Enter") submitEmail(); }}
                    value={email}
                    error={!!email?.length && !isValidEmail()}
                    placeholder="user@example.com"
                />

                {!!message?.message &&
                    <Alert severity={message.severity} sx={{ marginY: 4 }}>
                        {message.message}
                    </Alert>
                }

                </DialogContent>
                <DialogActions>
                <Button
                    onClick={onClose}
                    disabled={!isValidEmail() || submit}
                >CANCEL</Button>
                <Button
                    onClick={submitEmail}
                    disabled={!isValidEmail() || submit}
                >VERIFY</Button>
            </DialogActions>
        </Dialog>
    );
};