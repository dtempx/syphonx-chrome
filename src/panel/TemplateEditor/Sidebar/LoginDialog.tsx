
import React, { useEffect, useState, } from "react";

import { useApp, } from "../context";
import { regexp } from "../lib";
import { getUser, validateSession, watchUser, } from "../lib/cloud";

import {
    TransitionUp,
} from "../components";

import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Typography,
    TextField,
} from "@mui/material";

import {
    Close as CloseIcon,
} from "@mui/icons-material"

export interface Props {
    open: boolean;
    onClose: (event: React.SyntheticEvent) => void;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const label = "VERIFY EMAIL";

export default ({ open, onClose, setOpen, }: Props) => {
    const { email, setEmail, setUser, user, verified, } = useApp();

    const [ submit, setSubmit, ] = useState<boolean>(false);
    const [ valid, setValid, ] = useState<boolean>(false);
    const [ value, setValue, ] = useState<string>(email);

    const submitEmail = async (): Promise<void> => {
        if (valid) {
            setEmail(value.toLowerCase());

            const user = await getUser(value.toLowerCase());
            if (user?.id) {
                setSubmit(true);
            }
        }
    }

    const validate = () => {
        const bool = !!value?.length && regexp.email.test(value);
        setValid(bool);
    }

    useEffect(() => {
        (async () => {
            if (email && submit) {
                watchUser(email, result => {
                    if (result)
                        setUser(result);
                });
            }
        })();
    }, [ submit ]);


    useEffect(() => {
        if (submit) {
            setTimeout(() => {
                setOpen(false);
                setSubmit(false);
                setValid(false);
                setValue("");
            }, 5000);
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
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={validate}
                    value={value}
                    error={!!value?.length && !valid}
                    placeholder="user@example.com"
                />

                {submit && !verified && !user && 
                    <>
                        <br />
                        <Alert severity="info">
                            Great! An email has been sent to the address above, please verify.
                        </Alert>
                    </>
                }

                {submit && user && validateSession(user) &&
                    <>
                        <br />
                        <Alert severity="success">
                            Thanks for verifying your email, enjoy working in SyphonX!
                        </Alert>
                    </>
                }

                {!submit && user && validateSession(user) &&
                    <>
                        <br />
                        <Alert severity="success">
                            Welcome back, {user.email}, enjoy working in SyphonX!
                        </Alert>
                    </>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>CANCEL</Button>
                <Button
                    onClick={submitEmail}
                    disabled={!valid || submit}
                >VERIFY</Button>
            </DialogActions>
        </Dialog>
    );
};