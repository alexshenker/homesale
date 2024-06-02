"use client";

import { random } from "lodash";
import React, { useCallback, useState } from "react";
import { ToastId, ToastProps } from "./Toast";
import ToastContainer from "./ToastContainer";

export type AddToast = (
    message: Pick<ToastProps, "message">["message"],
    severity: Pick<ToastProps, "severity">["severity"]
) => void;

export type RemoveToast = (id: ToastId) => void;

const makeToastId = (): ToastId => {
    return random(0.1234, 1234.1234, true).toString() as ToastId;
};

export interface ToastContext {
    create: AddToast;
    success: (message: string) => void;
    error: (message: string) => void;
    remove: RemoveToast;
}

export const toastContext = React.createContext<ToastContext | null>(null);

const ToastProvider = (
    props: React.PropsWithChildren<unknown>
): JSX.Element => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    const removeToast: RemoveToast = useCallback(
        (id: ToastId) => {
            setToasts((toasts) => toasts.filter((t) => t.toastId !== id));
        },
        [setToasts]
    );

    const addToast: AddToast = useCallback(
        (message, severity) => {
            const toastWithSameMessage = toasts.find(
                (t) => t.message === message
            );

            if (toastWithSameMessage) {
                removeToast(toastWithSameMessage.toastId);
            }

            const newToast: ToastProps = {
                toastId: makeToastId(),
                message,
                severity,
            };

            setToasts((toasts) => [...toasts, newToast]);
        },
        [removeToast, toasts]
    );

    return (
        <toastContext.Provider
            value={{
                create: addToast,
                success: (m: string) => addToast(m, "success"),
                error: (m: string) => addToast(m, "error"),
                remove: removeToast,
            }}
        >
            <ToastContainer toasts={toasts} />
            {props.children}
        </toastContext.Provider>
    );
};

export default ToastProvider;
