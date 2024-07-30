import prismaClient from "@/lib/db";
import { GetPropertyRes } from "@/lib/db/properties/getProperty";
import {
    SignedUrlBody,
} from "@/lib/requests/properties/uploadPropertyDocuments";
import  {
    PropertyDocumentName,
    bucketFunc,
    bucketUrlPath,
} from "@/utils/private/bucketMap";
import createSignedUrl from "@/utils/private/createSignedUrl";
import resStatus from "@/utils/private/resStatus";
import exhaustiveSwitch from "@/utils/public/exhaustiveSwitch";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
    const body = await req.json();

    const parsedBody = SignedUrlBody.safeParse(body);

    if (parsedBody.success === false) {
        return resStatus(400, "Invalid property document data");
    }
    const propId = parsedBody.data.propertyId;
    const fileName = parsedBody.data.fileName;

    const propertyDocumentKey = bucketFunc.propertyDocPath(propId, fileName);
    const propertyDocumentSrc = bucketUrlPath(propertyDocumentKey);
    try {
        const signedUploadUrl = await createSignedUrl(
            propertyDocumentKey,
            "PUT",
            4
        );

        //Update the property doc with the url src
        const property = await prismaClient.property.findUnique({
            where: {
                id: propId,
            },
        });

        if (property === null) {
            return resStatus(400, "Property not found");
        }

        const itemToUpdate = getItemToUpdate(fileName);

        const updatedItem = (() => {
            if (itemToUpdate === "photos") {
                if (property.photos.some((p) => p === propertyDocumentSrc)) {
                    return null;
                } else {
                    return {
                        photos: [...property.photos, propertyDocumentSrc],
                    };
                }
            } else {
                if (property[itemToUpdate] === null) {
                    return {
                        [itemToUpdate]: propertyDocumentSrc,
                    };
                } else {
                    return null;
                }
            }
        })();

        if (updatedItem !== null) {
            await prismaClient.property.update({
                where: {
                    id: propId,
                },
                data: {
                    ...updatedItem,
                },
            });
        }

        return Response.json(signedUploadUrl);
    } catch (e) {
        console.error(e);

        return resStatus(500, "Failed to get signed url");
    }
}

const getItemToUpdate = (
    fileName: PropertyDocumentName
): keyof NonNullable<GetPropertyRes> => {
    switch (fileName) {
        case "primary_photo": {
            return "primaryPhoto";
        }
        case "video": {
            return "video";
        }
        case "HOA_bylaws": {
            return "HOA_bylaws_document_src";
        }
        case "deed": {
            return "Deed_src";
        }
        case "owner_id_back": {
            return "Owner_ID_back_src";
        }
        case "owner_id_front": {
            return "Owner_ID_front_src";
        }
        case "photo_1":
        case "photo_2":
        case "photo_3":
        case "photo_4":
        case "photo_5":
        case "photo_6": {
            return "photos";
        }

        default: {
            return exhaustiveSwitch(fileName);
        }
    }
};
