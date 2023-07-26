
import React, { useEffect, useState, } from "react";

import { useApp, } from "../context";
import { regexp } from "../lib";

import {
    TransitionUp
} from "../components";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
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
    const { email, initialUserRequestComplete, setEmail, user, verified } = useApp();

    const [ loading, setLoading ] = useState<boolean>(true);
    const [ message, setMessage ] = useState<{ severity: "info" | "success"; message: string; }>({ severity: "info", "message": "" });
    const [ submit, setSubmit ] = useState<boolean>(false);
    const [ valid, setValid ] = useState<boolean>(false);
    const [ value, setValue ] = useState<string>(email);

    useEffect(() => {
        if (initialUserRequestComplete)
            setLoading(false);
    }, [initialUserRequestComplete]);

    const submitEmail = async (): Promise<void> => {
        if (valid) {
            setEmail(value);
            setSubmit(true);
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
    }, [ verified, ]);

    return (
        <Dialog
            fullWidth
            open={open}
            onClose={onClose}
            TransitionComponent={TransitionUp}
            maxWidth="sm"
        >
            {loading && 
                <DialogContent>
                    <Box sx={{ display: "flex", minHeight: "320px", justifyContent: "center", alignItems: "center" }}>
                        <CircularProgress />
                    </Box>
                </DialogContent>
            }

            {!loading &&
                <>
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
                </>
            }
        </Dialog>
    );
};