import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { HookResult } from "./types";
import urlToFile from "../urlToFile";

const useUrlToFile = (
    input: {
        url: string;
        fileName: string;
        type?: "img";
    } | null
): HookResult<File | null> => {
    const file = useQuery({
        queryKey:
            input === null ? [] : ["url-to-file", input.url, input.fileName],
        queryFn:
            input === null
                ? () => null
                : async () => urlToFile(input.url, input.fileName, input.type),
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
