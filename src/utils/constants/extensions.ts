const svgExt = "svg";
const jpegExt = "jpeg";
const jpgExt = "jpg";
const pngExt = "png";
const pdfExt = "pdf";

const extensionFileTypes = [svgExt, jpegExt, jpgExt, pngExt, pdfExt] as const;

export const imgExtensions = [
    `.${svgExt}`,
    `.${jpegExt}`,
    `.${jpgExt}`,
    `.${pngExt}`,
] as const;

type ExtensionFileType = (typeof extensionFileTypes)[number];

export const isValidExtension = (
    candidateExt: unknown
): candidateExt is ExtensionFileType => {
    return extensionFileTypes.some((ext) => candidateExt === ext);
};

export const extToContentType: Record<ExtensionFileType, string> = {
    [svgExt]: "image/svg+xml",
    [jpegExt]: "image/jpeg",
    [jpgExt]: "image/jpeg",
    [pngExt]: "image/png",
    [pdfExt]: "application/pdf",
};

const extensions = [`.${pdfExt}`, ...imgExtensions] as const;

export type Extension = (typeof extensions)[number];
