import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { HookResult } from "./types";

async function urlToFile(url: string, type: "img"): Promise<File | null> {
    const res = await fetch(url);

    return res.ok ? new File([await res.blob()], type) : null;
}

const useUrlToFile = (
    input: {
        url: string;
        type: "img";
    } | null
): HookResult<File | null> => {
    const file = useQuery({
        queryKey: ["url-to-file"],
        queryFn:
            input === null
                ? undefined
                : async () => urlToFile(input.url, input.type),
        enabled: input !== null,
    });

    return useMemo(() => {
        if (file.status === "error") {
            return {
                data: undefined,
                isLoading: false,
                hasError: true,
                error: file.error,
            };
        }

        if (file.status === "pending") {
            return {
                data: undefined,
                isLoading: true,
                hasError: false,
            };
        }

        return {
            data: file.data,
            isLoading: false,
            hasError: false,
        };
    }, [file, file.status, file.data]);
};

export default useUrlToFile;
