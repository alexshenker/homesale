import { HookResult } from "@/utils/public/hooks/types";
import { UseQueryResult } from "@tanstack/react-query";

interface Args<D> {
    status: UseQueryResult<D>["status"];
    data: UseQueryResult<D>["data"];
    error: UseQueryResult<D>["error"];
}

const makeHookResponse = <D>({
    status,
    error,
    data,
}: Args<D>): HookResult<D> => {
    if (status === "pending") {
        return {
            data: undefined,
            isLoading: true,
            hasError: false,
        };
    }

    if (status === "error") {
        return {
            data: undefined,
            isLoading: false,
            hasError: true,
            error: error,
        };
    }

    if (data === undefined) {
        return {
            data: undefined,
            isLoading: false,
            hasError: true,
            error: "Unknown error",
        };
    }

    return {
        data: data,
        isLoading: false,
        hasError: false,
    };
};

export default makeHookResponse;
