"use client";

import PropertyEditForm from "@/components/PropertyEditForm/PropertyEditForm";
import { PropertyId } from "@/opaqueIdTypes";
import { $propertyid } from "@/utils/public/routes";
import { useParams } from "next/navigation";

const Page = (): JSX.Element => {
    const params = useParams<{ [$propertyid]: PropertyId }>();

    return (
        <div>
            <PropertyEditForm propertyId={params[$propertyid]} />
        </div>
    );
};

export default Page;
