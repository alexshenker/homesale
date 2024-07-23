"use client";

import { Box, Stack } from "@mui/material";
import {
    creatorConfirmedPermissionField,
    ownerFirstnameField,
    ownerLastnameField,
    ownerMiddlenameField,
} from "../PropertyEditForm";
import FormCheckboxField from "@/components/fields/formfields/FormCheckboxField";
import Text from "@/components/ui/text/Text";
import { GetPropertyRes } from "@/lib/db/properties/getProperty";
import { format } from "date-fns";
import Space from "@/components/ui/Space";
import FormTextField from "@/components/fields/formfields/FormTextField";
import FileField from "@/components/fields/fileField/FileField";
import { useEffect, useRef, useState } from "react";
import useUrlToFile, { makeArg } from "@/utils/public/hooks/useUrlToFile";

interface Props {
    property: NonNullable<GetPropertyRes>;
}

const Documents = ({ property }: Props): JSX.Element => {
    //Track if we've already fetched a given file
    const deedFetched = useRef(false);
    const IDFrontFetched = useRef(false);
    const IDBackFetched = useRef(false);

    const [deed, setDeed] = useState<File | null>(null);
    const [IDFront, setIDFront] = useState<File | null>(null);
    const [IDBack, setIDBack] = useState<File | null>(null);

    const deedFile = useUrlToFile(makeArg(property.Deed_src, "deed"));
    const IDFrontFile = useUrlToFile(
        makeArg(property.Owner_ID_front_src, "owner_id_front")
    );
    const IDBackFile = useUrlToFile(
        makeArg(property.Owner_ID_back_src, "owner_id_front")
    );

    useEffect(() => {
        if (deedFetched.current === false && deed === null) {
            if (deedFile.data !== undefined) {
                deedFetched.current = true;

                setDeed(deedFile.data);
            }
        }

        if (IDFrontFetched.current === false && IDFront === null) {
            if (IDFrontFile.data !== undefined) {
                IDFrontFetched.current = true;

                setIDFront(IDFrontFile.data);
            }
        }

        if (IDBackFetched.current === false && IDBack === null) {
            if (IDBackFile.data !== undefined) {
                IDBackFetched.current = true;

                setIDBack(IDBackFile.data);
            }
        }
    }, [deedFile, IDFrontFile, IDBackFile]);

    return (
        <Box>
            <Stack>
                <FormCheckboxField
                    name={creatorConfirmedPermissionField}
                    disabled={
                        property.creator_confirmed_management_permission ===
                        true
                    }
                    label={
                        <Box maxWidth={"300px"}>
                            <Text>Are you the owner of this property?</Text>

                            <Text>
                                If not, do you have permission from the owner/s
                                to manage it?
                            </Text>

                            <Text type="danger">
                                *Note, once checked & saved, this cannot be
                                undone*
                            </Text>
                        </Box>
                    }
                    options={confirmPermissionOptions}
                />
                {property.creator_confirmed_management_permission &&
                    property.creator_confirmed_management_permission_on_date && (
                        <Text>
                            Confirmed on{" "}
                            {format(
                                property.creator_confirmed_management_permission_on_date,
                                "MMMM do, yyyy"
                            )}
                        </Text>
                    )}
            </Stack>

            <Space />

            <Box>
                <Text>
                    Provide the owner's information as it appears on the Deed
                </Text>
                <Space h={5} />
                <Stack width={"300px"} gap={1}>
                    <FormTextField
                        name={ownerFirstnameField}
                        label="Owner's First Name"
                        required
                    />

                    <FormTextField
                        name={ownerMiddlenameField}
                        label="Owner's Middle Name"
                    />

                    <FormTextField
                        name={ownerLastnameField}
                        label="Owner's Last Name"
                        required
                    />
                </Stack>
            </Box>

            <Space />

            <Box width="100%" maxWidth={"300px"} minWidth="175px">
                <FileField
                    value={deed}
                    onChange={setDeed}
                    label="Upload Property Deed"
                />
            </Box>

            <Space />

            <Box display="flex" flexWrap={"wrap"} gap={"8px"} maxWidth="608px">
                <Box width={"300px"}>
                    <FileField
                        value={IDFront}
                        onChange={setIDFront}
                        label="Owner ID Front"
                    />
                </Box>

                <Box width={"300px"}>
                    <FileField
                        value={IDBack}
                        onChange={setIDBack}
                        label="Owner ID Back"
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Documents;

export const confirmPermissionOptions = [
    { label: "Yes, I am the owner or have permission from the owner/s" },
] as const;

export type ConfirmPermissionOption = typeof confirmPermissionOptions;
