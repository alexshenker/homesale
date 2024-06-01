"use client";

import PropertyEditForm from "@/components/PropertyEditForm/PropertyEditForm";
import Loading from "@/components/ui/Loading";
import Text from "@/components/ui/text/Text";
import useProperty from "@/lib/hooks/properties/useProperty";
import { PropertyId } from "@/opaqueIdTypes";
import { $propertyid } from "@/utils/public/routes";
import { useParams } from "next/navigation";

const Page = (): JSX.Element => {
    const params = useParams<{ [$propertyid]: PropertyId }>();

    const property = useProperty(params[$propertyid]);

    if (property.isLoading) {
        return <Loading />;
    }

    if (property.hasError) {
        return <Text type="error">Failed to get property</Text>;
    }

    if (property.data === null) {
        return <Text type="error">Property not found</Text>;
    }

    return (
        <div>
            <PropertyEditForm property={property.data} />
        </div>
    );
};

export default Page;
