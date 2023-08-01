
import React, { useEffect, useState } from "react";

import { useApp, useUser } from "../context";
import { regexp } from "../lib";
import { getUser, watchUser, validateSession } from "../lib/cloud";

import {
    TransitionUp
} from "../components";

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
    const { serviceUrl } = useApp();
    const { user, setUser, verified, setVerified } = useUser();

    const [ message, setMessage ] = useState<{ severity: "info" | "success"; message: string; }>({ severity: "info", "message": "" });
    const [ submit, setSubmit ] = useState<boolean>(false);
    const [ valid, setValid ] = useState<boolean>(false);
    const [ value, setValue ] = useState<string>(user?.email ? user.email : "");

    const submitEmail = async (): Promise<void> => {
        if (valid) {
            setUser({ email: value });
            setSubmit(true);

            const user = await getUser(value, serviceUrl || undefined);
            if (user?.id) {
                setUser(user);
                watchUser(user.id, result => {
                    if (result && JSON.stringify(user) !== JSON.stringify(result)) {
                        setUser(result);    
                        const v = validateSession(result);
                        setVerified(v);
                    }
                });
            }
        }
    }

    const validate = () => {
        const bool = !!value?.length && regexp.email.test(value);
        setValid(bool);
    }

    useEffect(() => {
        const message = submit ? "Great! An email has been sent to the address above, please verify." : "";
        setMessage({ severity: "info", message });
    }, [ submit ]);

    useEffect(() => {
        if (user && verified && !submit) {
            setMessage({ severity: "info", message: `Welcome back, ${user?.email}, enjoy working in SyphonX!` });
        } else if (user && verified && submit) {
            setMessage({ severity: "success", message: "Thanks for verifying your email, enjoy working in SyphonX!" });
            setTimeout(() => {
                setMessage({ severity: "info", message: "" });
                setSubmit(false);
                setValid(false);
                setValue("");
                setOpen(false);
            }, 3000);
        } else {
            setMessage({ severity: "info", message: "" });
        }
    }, [ verified ]);

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
                    onChange={(e) => setValue(e.target.value?.toLowerCase())}
                    onKeyDown={(e) => { if (e.key === "Enter") submitEmail(); else validate(); }}
                    value={value}
                    error={!!value?.length && !valid}
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
                    disabled={!valid || submit}
                >CANCEL</Button>
                <Button
                    onClick={submitEmail}
                    disabled={!valid || submit}
                >VERIFY</Button>
            </DialogActions>
        </Dialog>
    );
};