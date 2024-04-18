"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Toast, { ToastProps } from "./Toast";

interface Props {
  toasts: ToastProps[];
}

const ToastContainer = (props: Props): JSX.Element => {
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    if (ref.current !== null) {
      return;
    }

    ref.current = document.querySelector<HTMLElement>("body");
  }, []);

  if (ref.current !== null) {
    return createPortal(
      <div className="absolute right-0 top-0">
        {props.toasts.map((t) => {
          return <Toast key={t.toastId} {...t} />;
        })}
      </div>,
      ref.current,
    );
  }

  return <></>;
};

export default ToastContainer;
