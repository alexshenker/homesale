"use client";

import useProperty from "@/lib/hooks/properties/useProperty";
import { PropertyId } from "@/opaqueIdTypes";
import Loading from "../ui/Loading";
import Text from "../ui/text/Text";

const propertyFormPages = [""] as const;

export type PropertyFormPage = (typeof propertyFormPages)[number];

interface Props {
    propertyId: PropertyId;
}

const PropertyEditForm = (props: Props): JSX.Element => {
    const property = useProperty(props.propertyId);

    if (property.isLoading) {
        return <Loading />;
    }

    if (property.hasError) {
        return <Text type="error">Failed to get property</Text>;
    }

    return (
        <div>
            <div></div>
        </div>
    );
};

export default PropertyEditForm;
