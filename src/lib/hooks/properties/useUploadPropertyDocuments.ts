import uploadPropertyDocuments from "@/lib/requests/properties/uploadPropertyDocuments";
import { urlToFileQueryKey } from "@/utils/public/hooks/useUrlToFile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forEach } from "lodash";

const useUploadPropertyDocuments = () => {
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationFn: uploadPropertyDocuments,
        onSuccess: (_, body) => {
            forEach(body.files, (file, fileName) => {
                if (file !== undefined) {
                    queryClient.invalidateQueries({
                        queryKey: urlToFileQueryKey(fileName),
                    });
                }
            });
        },
    });

    return mutateAsync;
};

export default useUploadPropertyDocuments;
