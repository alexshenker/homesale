"use client";

import { hours } from "milliseconds";
import React, { useEffect } from "react";
import { ToastContext, toastContext } from "./ToastProvider";
import localStorageAvailable from "@/utils/public/localStorageAvailable";

const useToast = () => {
  useEffect(() => {
    warning();
  }, []);

  return React.useContext(toastContext) as ToastContext;
};

export default useToast;

const warn = {
  key: "toastWarningUsed",
  value: "true",
};

const expiresInMS = hours(24);

const warning = () => {
  if (!localStorageAvailable() || process.env.NODE_ENV === "production") {
    return;
  }

  const wasWarned = getWithExpiry(warn.key) === warn.value;

  if (wasWarned) {
    return;
  } else {
    setWithExpiry(warn.key, warn.value, expiresInMS);
  }

  console.warn(
    `[${useToast.name}]: warning, typecasting 'as ToastContext' is band-aiding a potentially null object`,
  );
};

function setWithExpiry(key: string, value: string, ttl: number) {
  const now = new Date();

  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };

  localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key: string) {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}
