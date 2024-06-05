"use client";

import Loading from "@/components/ui/Loading";
import LoadingTable from "@/components/ui/table/LoadingTable";
import Table, { Row } from "@/components/ui/table/Table";
import LinkText from "@/components/ui/text/LinkText/LinkText";
import Text from "@/components/ui/text/Text";
import { GetUsersPropertiesRes } from "@/lib/db/properties/getUsersProperties";
import useUserProperties from "@/lib/hooks/properties/useUserProperties";
import { HookResult } from "@/utils/public/hooks/types";
import useAuth from "@/utils/public/hooks/useAuth";
import routes, { $propertyid, edit_listing } from "@/utils/public/routes";
import toFullAddress from "@/utils/public/toFullAddress";
import { Box, Stack } from "@mui/material";
import { ListingType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const columns = ["Address", "Listing Type", "Published Status"] as const;
type Column = (typeof columns)[number];

const listingTypeTerm: Record<ListingType, string> = {
    sell: "Sale",
    rent: "Rent",
};

const publishedStatus: Record<`${boolean}`, string> = {
    true: "Published",
    false: "Unpublished",
};

const Manage = (): JSX.Element => {
    const auth = useAuth();

    const properties = useUserProperties(auth.data?.user.id ?? null);

    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("");

    const propertiesFiltered: HookResult<GetUsersPropertiesRes> =
        useMemo(() => {
            if (properties.isLoading || properties.hasError) {
                return properties;
            }

            if (searchTerm.toLowerCase().trim().length === 0) {
                return properties;
            }

            const filtered = properties.data.filter((p) => {
                const term = searchTerm.toLowerCase().trim();

                return (
                    p.street_address.toLowerCase().includes(term) ||
                    listingTypeTerm[p.listing_type]
                        .toLowerCase()
                        .includes(term) ||
                    publishedStatus[`${p.published}`]
                        .toLowerCase()
                        .startsWith(term)
                );
            });

            return {
                data: filtered,
                isLoading: false,
                hasError: false,
            };
        }, [properties, searchTerm]);

    const rows: HookResult<Row<Column>[]> = useMemo(() => {
        if (propertiesFiltered.isLoading || propertiesFiltered.hasError) {
            return propertiesFiltered;
        }

        const rowsLocal: Row<Column>[] = propertiesFiltered.data.map((p) => {
            const propertyRoute = `${routes[edit_listing][$propertyid](p.id).$}`;

            return {
                key: p.id,
                Address: {
                    value: (
                        <LinkText href={propertyRoute}>
                            {toFullAddress(p)}
                        </LinkText>
                    ),
                    sortValue: toFullAddress(p),
                },
                "Listing Type": listingTypeTerm[p.listing_type],
                "Published Status": publishedStatus[`${p.published}`],
                onClick: () => router.push(propertyRoute),
            };
        });

        return {
            data: rowsLocal,
            isLoading: false,
            hasError: false,
        };
    }, [propertiesFiltered]);

    if (properties.isLoading || rows.isLoading) {
        return <LoadingTable columns={columns} />;
    }

    if (properties.hasError || rows.hasError) {
        return <Text type="error">Failed to get properties</Text>;
    }

    return (
        <>
            <Table
                columns={columns}
                rows={rows.data}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
        </>
    );
};

export default Manage;
