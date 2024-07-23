import updateProperty from "@/lib/requests/properties/updateProperty";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPropertyKeyMaker } from "./useProperty";

const useUpdateProperty = () => {
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationFn: updateProperty,
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: getPropertyKeyMaker(res.id),
            });
        },
    });

    return mutateAsync;
};

export default useUpdateProperty;
