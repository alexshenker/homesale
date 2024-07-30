import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPropertyKeyMaker } from "./useProperty";
import unpublishProperty from "@/lib/requests/properties/unpublishProperty";

const useUnpublishProperty = () => {
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationFn: unpublishProperty,
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: getPropertyKeyMaker(res.propertyId),
            });
        },
    });

    return mutateAsync;
};

export default useUnpublishProperty;
