"use client";

import Loading from "@/components/ui/Loading";
import LinkText from "@/components/ui/text/LinkText/LinkText";
import Text from "@/components/ui/text/Text";
import useUserProperties from "@/lib/hooks/properties/useUserProperties";
import useAuth from "@/utils/public/hooks/useAuth";
import routes, { $propertyid, edit_listing } from "@/utils/public/routes";
import toFullAddress from "@/utils/public/toFullAddress";
import { Stack } from "@mui/material";

const Manage = (): JSX.Element => {
    const auth = useAuth();

    const properties = useUserProperties(auth.data?.user.id ?? null);

    if (properties.isLoading) {
        return <Loading />;
    }

    if (properties.hasError) {
        return <Text type="error">Failed to get properties</Text>;
    }

    return (
        <Stack gap={1}>
            {properties.data.map((p) => {
                return (
                    <LinkText
                        key={p.id}
                        href={`${routes[edit_listing][$propertyid](p.id).$}`}
                    >
                        {toFullAddress(p)}
                    </LinkText>
                );
            })}
        </Stack>
    );
};

export default Manage;
