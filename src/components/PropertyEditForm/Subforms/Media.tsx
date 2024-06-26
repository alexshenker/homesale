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

const KB = 1024;
const MB = KB * KB;
const maxSizeMB = 4;
const maximumSize = MB * maxSizeMB;

interface Props {
    property: NonNullable<GetPropertyRes>;
}

type localPhotoId = `${number}`;

type OtherPhotos = Record<localPhotoId, File | null>;

const maxNumberOfPhotos = 6; //Not including primary photo

const Media = (props: Props): JSX.Element => {
    const [primaryPhoto, setPrimaryPhoto] = useState<File | null>(null);

    //Track if we've already fetched the existing saved photos
    const savedPhotosFetched = useRef(false);

    const toast = useToast();

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
                    return await urlToFile(photoUrl, `Photo ${idx + 1}`);
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
                photoObject[`${idx + 1}`] = f;
            });

            setOtherPhotos(photoObject);
        })();
    }, []);

    useEffect(() => {
        if (primaryPhoto !== null) {
            return;
        }

        if (isNil(savedPrimaryPhoto.data)) {
            return;
        }

        setPrimaryPhoto(savedPrimaryPhoto.data);
    });

    const updatePrimaryPhoto = (photo: File | null) => {
        if ((photo?.size ?? 0) > maximumSize) {
            toast.error(`File size should not exceed ${maxSizeMB}MB`);
            return;
        }

        setPrimaryPhoto(photo);
    };

    const updateOtherPhoto = (photo: File | null, key: localPhotoId) => {
        if ((photo?.size ?? 0) > maximumSize) {
            toast.error(`File size should not exceed ${maxSizeMB}MB`);
            return;
        }

        const newOtherPhotos = {
            ...otherPhotos,
            [key]: photo,
        };

        setOtherPhotos(newOtherPhotos);
    };

    return (
        <Box>
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
