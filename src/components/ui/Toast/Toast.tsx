"use client";

import { Alert, AlertProps, Snackbar, SnackbarProps } from "@mui/material";
import { useEffect, useState } from "react";
import useToast from "./useToast";

export type ToastId = string & { _isToastId: true };

type Severity = NonNullable<AlertProps["severity"]>;

export interface ToastProps {
    toastId: ToastId;
    severity: Severity;
    message: string;
}

type Props = SnackbarProps & ToastProps;

const autoHideDuration: SnackbarProps["autoHideDuration"] = 5000;

const Toast = ({
    toastId,
    severity,
    message,
    ...snackbarProps
}: Props): JSX.Element => {
    const { remove: removeToast } = useToast();

    const [open, setOpen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(toastId);
        }, autoHideDuration + 500); //The toast should be removed from toastContext only after autoHideDuration is complete, to ensure MUI's Toast closing effect remains.

        return () => {
            clearTimeout(timer);
        };
    }, [toastId, removeToast]);

    return (
        <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={autoHideDuration}
            {...snackbarProps}
        >
            <Alert severity={severity}>{message}</Alert>
        </Snackbar>
    );
};

export default Toast;
