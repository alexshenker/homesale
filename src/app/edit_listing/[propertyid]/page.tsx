"use client";

import LawnImage from "@/components/LawnImage";
import PropertyEditForm from "@/components/PropertyEditForm/PropertyEditForm";
import Loading from "@/components/ui/Loading";
import Text from "@/components/ui/text/Text";
import useProperty from "@/lib/hooks/properties/useProperty";
import { PropertyId } from "@/opaqueIdTypes";
import useUrlToFile from "@/utils/public/hooks/useUrlToFile";
import { $propertyid } from "@/utils/public/routes";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";

const Page = (): JSX.Element => {
    const params = useParams<{ [$propertyid]: PropertyId }>();

    const property = useProperty(params[$propertyid]);

    if (property.isLoading) {
        return (
            <Box position="relative">
                <Loading />
                <LawnImage />
            </Box>
        );
    }

    if (property.hasError) {
        return <Text type="error">Failed to get property</Text>;
    }

    if (property.data === null) {
        return <Text type="error">Property not found</Text>;
    }

    return <PropertyEditForm property={property.data} />;
};

export default Page;
