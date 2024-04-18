"use client";

import {
  SessionProvider as NextAuthSessionProvider,
  SessionProviderProps,
} from "next-auth/react";
import { FC, PropsWithChildren } from "react";

interface Props extends SessionProviderProps {}

const SessionProvider: FC<PropsWithChildren<Props>> = ({
  children,
  ...props
}) => {
  return (
    <NextAuthSessionProvider {...props}>{children}</NextAuthSessionProvider>
  );
};

export default SessionProvider;
