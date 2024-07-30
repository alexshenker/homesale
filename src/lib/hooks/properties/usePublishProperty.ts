import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPropertyKeyMaker } from "./useProperty";
import publishProperty from "@/lib/requests/properties/publishProperty";

const usePublishProperty = () => {
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationFn: publishProperty,
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: getPropertyKeyMaker(res.propertyId),
            });
        },
    });

    return mutateAsync;
};

export default usePublishProperty;
