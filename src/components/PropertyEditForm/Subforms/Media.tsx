import FileField from "@/components/fields/fileField/FileField";
import FormFileField from "@/components/fields/formfields/FormFileField";
import { imgExtensions } from "@/utils/constants/extensions";
import { Box } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { mainPhotoSrcField } from "../PropertyEditForm";
import { GetPropertyRes } from "@/lib/db/properties/getProperty";
import useUrlToFile from "@/utils/public/hooks/useUrlToFile";
import { isNil, range } from "lodash";
import Wrap from "@/components/Wrap";
import Space from "@/components/ui/Space";
import urlToFile from "@/utils/public/urlToFile";
import useToast from "@/components/ui/Toast/useToast";
import typedKeys from "@/utils/public/typedKeys";
import uploadPropertyDocuments from "@/lib/requests/properties/uploadPropertyDocuments";
import Loading from "@/components/ui/Loading";
import {
    PhotoNumber,
    S3PhotoFileName,
    S3primary_photo,
} from "@/utils/private/bucketMap";
import useProperty from "@/lib/hooks/properties/useProperty";
import useUploadPropertyDocuments from "@/lib/hooks/properties/useUploadPropertyDocuments";

const KB = 1024;
const MB = KB * KB;
const maxSizeMB = 4;
const maximumSize = MB * maxSizeMB;

interface Props {
    property: NonNullable<GetPropertyRes>;
}

type OtherPhotos = {
    [key in S3PhotoFileName]?: File | null;
};

const maxNumberOfPhotos = 6; //Not including primary photo

const Media = (props: Props): JSX.Element => {
    const propertyFetched = useProperty(props.property.id);

    const [primaryPhoto, setPrimaryPhoto] = useState<File | null>(null);

    //Track if we've already fetched the existing saved photos
    const primaryPhotoFetched = useRef(false);
    const savedPhotosFetched = useRef(false);

    const toast = useToast();

    const uploadDocuments = useUploadPropertyDocuments();

    const [loading, setLoading] = useState(false);

    const savedPrimaryPhoto = useUrlToFile(
        props.property.primaryPhoto
            ? { url: props.property.primaryPhoto, fileName: "primary_photo" }
            : null
    );

    const [otherPhotos, setOtherPhotos] = useState<OtherPhotos>({});

    useEffect(() => {
        if (Object.keys(otherPhotos).length > 0) {
            return;
        }

        if (savedPhotosFetched.current === true) {
            return;
        }

        (async () => {
            if (savedPhotosFetched.current === true) {
                return;
            }

            savedPhotosFetched.current = true;

            const promises = props.property.photos.map(
                async (photoUrl, idx) => {
                    return await urlToFile(photoUrl, `photo_${idx + 1}`);
                }
            );

            const photoFiles = await Promise.all(promises);

            //Ensure we have at least 6 items
            const fillerItems = range(
                maxNumberOfPhotos - photoFiles.length
            ).map((_) => null);

            const allElements = [...photoFiles, ...fillerItems];

            const photoObject: OtherPhotos = {};

            allElements.forEach((f, idx) => {
                const photoNum = (idx + 1) as PhotoNumber;

                photoObject[`photo_${photoNum}`] = f;
            });

            setOtherPhotos(photoObject);
        })();
    }, [otherPhotos]);

    useEffect(() => {
        if (primaryPhotoFetched.current === true) {
            return;
        }

        if (primaryPhoto !== null) {
            return;
        }

        if (isNil(savedPrimaryPhoto.data)) {
            return;
        }

        primaryPhotoFetched.current = true;

        setPrimaryPhoto(savedPrimaryPhoto.data);
    }, [primaryPhoto, savedPrimaryPhoto]);

    const updatePrimaryPhoto = async (photo: File | null) => {
        if ((photo?.size ?? 0) > maximumSize) {
            toast.error(`File size should not exceed ${maxSizeMB}MB`);
            return;
        }

        setPrimaryPhoto(photo);

        if (photo !== null) {
            await uploadPhoto(photo, "primary_photo");
        }
    };

    const updateOtherPhoto = async (
        photo: File | null,
        key: S3PhotoFileName
    ) => {
        if ((photo?.size ?? 0) > maximumSize) {
            toast.error(`File size should not exceed ${maxSizeMB}MB`);
            return;
        }

        if (photo !== null) {
            await uploadPhoto(photo, key);
        }

        const newOtherPhotos = {
            ...otherPhotos,
            [key]: photo,
        };

        setOtherPhotos(newOtherPhotos);
    };

    const deletePhoto = async (
        name: S3PhotoFileName | typeof S3primary_photo
    ) => {};

    const uploadPhoto = async (
        photoFile: File,
        name: S3PhotoFileName | typeof S3primary_photo
    ) => {
        try {
            setLoading(true);

            await uploadDocuments({
                propertyId: props.property.id,
                files: {
                    [name]: photoFile,
                },
            });

            toast.success("Photo uploaded");
        } catch (e) {
            if (process.env.NODE_ENV !== "production") {
                console.error(e);
            }

            toast.error("Failed to upload photo");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            {loading && <Loading fixed />}
            <FileField
                value={primaryPhoto}
                onChange={updatePrimaryPhoto}
                accept={imgExtensions}
                label="Primary Photo"
                loading={savedPrimaryPhoto.isLoading}
            />
            <Space />
            <Wrap cols={3} smCols={2} xsCols={1}>
                {typedKeys(otherPhotos).map((key) => {
                    return (
                        <FileField
                            key={`Photo ${key}`}
                            value={otherPhotos[key]}
                            onChange={(file) => {
                                updateOtherPhoto(file, key);
                            }}
                            accept={imgExtensions}
                            label={`Photo ${key}`}
                            loading={savedPrimaryPhoto.isLoading}
                        />
                    );
                })}
            </Wrap>
        </Box>
    );
};

export default Media;
