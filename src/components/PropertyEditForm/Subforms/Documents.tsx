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
import {
    PropertyDocumentName,
    S3deed,
    S3owner_id_back,
    S3owner_id_front,
    propertyDocumentNames,
} from "@/utils/private/bucketMap";
import useUploadPropertyDocuments from "@/lib/hooks/properties/useUploadPropertyDocuments";
import useToast from "@/components/ui/Toast/useToast";
import { useBoolean } from "usehooks-ts";
import { maxSizeMB, maximumSize } from "./Media";
import exhaustiveSwitch from "@/utils/public/exhaustiveSwitch";

interface Props {
    property: NonNullable<GetPropertyRes>;
}

type DocNames =
    | typeof S3owner_id_front
    | typeof S3owner_id_back
    | typeof S3deed;

const Documents = ({ property }: Props): JSX.Element => {
    const toast = useToast();
    const loading = useBoolean();

    //Track if we've already fetched a given file
    const deedFetched = useRef(false);
    const IDFrontFetched = useRef(false);
    const IDBackFetched = useRef(false);

    const [deed, setDeed] = useState<File | null>(null);
    const [IDFront, setIDFront] = useState<File | null>(null);
    const [IDBack, setIDBack] = useState<File | null>(null);

    /* Below, we turn the src url of an existing document to a File so we can attach it to the respective file field */
    const deedFile = useUrlToFile(makeArg(property.Deed_src, "deed"));
    const IDFrontFile = useUrlToFile(
        makeArg(property.Owner_ID_front_src, "owner_id_front")
    );
    const IDBackFile = useUrlToFile(
        makeArg(property.Owner_ID_back_src, "owner_id_front")
    );

    const uploadDocuments = useUploadPropertyDocuments();

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

    const setDocument = async (doc: File | null, name: DocNames) => {
        if ((doc?.size ?? 0) > maximumSize) {
            toast.error(`File size should not exceed ${maxSizeMB}MB`);
            return;
        }

        () => {
            switch (name) {
                case "deed": {
                    return setDeed(doc);
                }
                case "owner_id_front": {
                    return setIDFront(doc);
                }
                case "owner_id_back": {
                    return setIDBack(doc);
                }
                default: {
                    return exhaustiveSwitch(name);
                }
            }
        };

        if (doc !== null) {
            await uploadDocument(doc, name);
        }
    };

    const uploadDocument = async (doc: File, name: DocNames) => {
        try {
            loading.setTrue();

            await uploadDocuments({
                propertyId: property.id,
                files: {
                    [name]: doc,
                },
            });

            toast.success("Photo uploaded");
        } catch (e) {
            if (process.env.NODE_ENV !== "production") {
                console.error(e);
            }

            toast.error("Failed to upload photo");
        } finally {
            loading.setFalse();
        }
    };

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
                    onChange={(f) => setDocument(f, "deed")}
                    label="Upload Property Deed"
                />
            </Box>

            <Space />

            <Box display="flex" flexWrap={"wrap"} gap={"8px"} maxWidth="608px">
                <Box width={"300px"}>
                    <FileField
                        value={IDFront}
                        onChange={(f) => setDocument(f, "owner_id_front")}
                        label="Owner ID Front"
                    />
                </Box>

                <Box width={"300px"}>
                    <FileField
                        value={IDBack}
                        onChange={(f) => setDocument(f, "owner_id_back")}
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
