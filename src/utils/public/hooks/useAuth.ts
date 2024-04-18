import { useMemo } from "react";
import { HookResult } from "./types";

import { isNil } from "lodash";
import { isAfter, parseISO } from "date-fns";

import { useSession } from "next-auth/react";
import { UserId } from "@/opaqueIdTypes";

export const queryKey = ["auth"];

type ModifiedSession = {
    expires: string;
    user: { email: string; id: UserId };
};

const useAuth = (): HookResult<ModifiedSession | null> => {
    const { data, status } = useSession();

    return useMemo(() => {
        switch (status) {
            case "loading":
                return {
                    data: undefined,
                    isLoading: true,
                    hasError: false,
                };

            case "unauthenticated":
                return {
                    data: null,
                    isLoading: false,
                    hasError: false,
                };

            case "authenticated": {
                const { expires, user } = data;

                const expired =
                    expires === undefined
                        ? false
                        : isAfter(new Date(), parseISO(expires));

                const { email, id } = user ?? {};

                if (
                    expired ||
                    user === undefined ||
                    isNil(email) ||
                    isNil(id)
                ) {
                    return {
                        data: undefined,
                        isLoading: false,
                        hasError: true,
                        error: new Error(
                            `[${
                                useAuth.name
                            }] - Session is authenticated but is either expired, has no user, no email, or no Id: ${JSON.stringify(
                                data,
                            )}`,
                        ),
                    };
                }

                return {
                    data: { expires, user: { email, id } },
                    isLoading: false,
                    hasError: false,
                };
            }

            default:
                return {
                    data: undefined,
                    isLoading: false,
                    hasError: true,
                    error: new Error(
                        `[${useAuth.name}]: Unknown session error`,
                    ),
                };
        }
    }, [data, status]);
};

export default useAuth;
