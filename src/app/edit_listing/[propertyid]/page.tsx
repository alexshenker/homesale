"use client";

import PropertyEditForm from "@/components/PropertyEditForm/PropertyEditForm";
import Loading from "@/components/ui/Loading";
import Text from "@/components/ui/text/Text";
import useProperty from "@/lib/hooks/properties/useProperty";
import { PropertyId } from "@/opaqueIdTypes";
import useUrlToFile from "@/utils/public/hooks/useUrlToFile";
import { $propertyid } from "@/utils/public/routes";
import { useParams } from "next/navigation";

const Page = (): JSX.Element => {
    const params = useParams<{ [$propertyid]: PropertyId }>();

    const property = useProperty(params[$propertyid]);

    const hoaBylawsDocument = useUrlToFile(
        property?.data?.HOA_bylaws_document_src
            ? {
                  url: property.data.HOA_bylaws_document_src,
                  fileName: "HOA_Bylaws_Document",
              }
            : null
    );

    if (property.isLoading || hoaBylawsDocument.isLoading) {
        return <Loading />;
    }

    if (property.hasError || hoaBylawsDocument.hasError) {
        return <Text type="error">Failed to get property</Text>;
    }

    if (property.data === null) {
        return <Text type="error">Property not found</Text>;
    }

    return (
        <div>
            <PropertyEditForm
                property={property.data}
                hoaBylawsDocument={hoaBylawsDocument.data}
            />
        </div>
    );
};

export default Page;
