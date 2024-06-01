"use client";

import { useState } from "react";
import ListingType from "./Subforms/ListingType";
import { Button } from "@mui/material";
import { GetPropertyRes } from "@/lib/db/properties/getProperty";

export type SubformTitle = "Listing Type";

export type PropertyFormPage = {
    page: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    title: SubformTitle;
};

const propertyFormPages: PropertyFormPage[] = [
    { page: 1, title: "Listing Type" },
] as const;

interface Props {
    property: NonNullable<GetPropertyRes>;
}

const PropertyEditForm = ({ property }: Props): JSX.Element => {
    const [page, setPage] = useState<PropertyFormPage["page"]>(1);

    return (
        <div>
            <div>
                {propertyFormPages.map((p) => {
                    return (
                        <Button key={p.title} onClick={() => setPage(p.page)}>
                            {p.title}
                        </Button>
                    );
                })}
            </div>

            {(() => {
                switch (page) {
                    case 1: {
                        return (
                            <ListingType
                                nextPage={() => setPage(2)}
                                property={property}
                            />
                        );
                    }
                }
            })()}
        </div>
    );
};

export default PropertyEditForm;
